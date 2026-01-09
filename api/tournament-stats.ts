import { TOURNAMENT_PLAYERS } from '../lib/players.js';
import { getPuuid, getSummonerId, getSoloQ } from '../lib/riot.js';
import {
  calculateTournamentPoints,
  buildRanking,
  calculateMVP,
} from '../lib/tournament.js';

/* =========================
   CACHE
========================= */

let CACHE: any = null;
let LAST_UPDATE = 0;
let LAST_REFRESH = 0;

const CACHE_TTL = 1000 * 60 * 15;
const REFRESH_COOLDOWN = 1000 * 60 * 10;

export default async function handler(req: any, res: any) {
  try {
    const refreshRequested = req.query.refresh === 'true';
    const now = Date.now();

    if (!refreshRequested && CACHE && now - LAST_UPDATE < CACHE_TTL) {
      return res.status(200).json({ ...CACHE, fromCache: true });
    }

    if (refreshRequested && CACHE && now - LAST_REFRESH < REFRESH_COOLDOWN) {
      return res.status(200).json({
        ...CACHE,
        fromCache: true,
        message: 'Refresh en cooldown',
      });
    }

    LAST_REFRESH = now;

    const players = [];

    for (const p of TOURNAMENT_PLAYERS) {
      try {
        const puuid = await getPuuid(p.nickname, p.tag);
        const summonerId = await getSummonerId(puuid);
        const ranked = await getSoloQ(summonerId);

        if (!ranked) continue;

        const totalGames = ranked.wins + ranked.losses;
        const winrate =
          totalGames > 0
            ? Number(((ranked.wins / totalGames) * 100).toFixed(2))
            : 0;

        const tournamentPoints = calculateTournamentPoints(
          ranked.tier,
          ranked.rank,
          ranked.leaguePoints,
        );

        players.push({
          nickname: p.nickname,
          tier: ranked.tier,
          rank: ranked.rank,
          lp: ranked.leaguePoints,
          wins: ranked.wins,
          losses: ranked.losses,
          totalGames,
          winrate,
          tournamentPoints,
        });
      } catch (err) {
        console.error(`Error player ${p.nickname}`, err);
      }
    }

    const ranking = buildRanking(players);
    const mvp = calculateMVP(ranking);

    const payload = {
      updatedAt: new Date().toISOString(),
      players,
      ranking,
      mvp,
      fromCache: false,
    };

    CACHE = payload;
    LAST_UPDATE = now;

    res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
