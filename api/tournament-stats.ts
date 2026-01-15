import { TOURNAMENT_PLAYERS } from '../lib/players.js';
import { getPuuid, getSoloQByPuuid } from '../lib/riot.js';
import {
  calculateTournamentPoints,
  buildRanking,
  calculateMVP,
} from '../lib/tournament.js';

/* =========================
   CONFIG
========================= */

const CONCURRENCY_LIMIT = 3;
const PLAYER_CACHE_TTL = 1000 * 60 * 20; // 20 min
const CACHE_TTL = 1000 * 60 * 10; // 10 min
const REFRESH_COOLDOWN = 1000 * 60 * 10;

/* =========================
   GLOBAL CACHE
========================= */

let CACHE: any = null;
let LAST_UPDATE = 0;
let LAST_REFRESH = 0;

/* =========================
   PLAYER CACHE
========================= */

const PLAYER_CACHE = new Map<string, { timestamp: number; data: any }>();

/* =========================
   CORS
========================= */

function setCors(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/* =========================
   UTILS
========================= */

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 1200,
): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    if (err?.status === 429 && retries > 0) {
      await sleep(delay);
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw err;
  }
}

/* =========================
   PLAYER FETCH
========================= */

async function fetchPlayerData(p: any) {
  const cacheKey = `${p.nickname}#${p.tag}`;
  const cached = PLAYER_CACHE.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < PLAYER_CACHE_TTL) {
    return cached.data;
  }

  const puuid = await withRetry(() => getPuuid(p.nickname, p.tag));

  const ranked = await withRetry(() => getSoloQByPuuid(puuid));

  let data;

  if (!ranked) {
    // 🟡 UNRANKED
    data = {
      nickname: p.nickname,
      tag: p.tag,
      role: p.role,
      group: p.group, // A | B
      tier: 'UNRANKED',
      rank: null,
      lp: 0,
      wins: 0,
      losses: 0,
      totalGames: 0,
      winrate: 0,
      tournamentPoints: 0,
    };
  } else {
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

    data = {
      nickname: p.nickname,
      tag: p.tag,
      role: p.role,
      group: p.group, // A | B
      tier: ranked.tier,
      rank: ranked.rank,
      lp: ranked.leaguePoints,
      wins: ranked.wins,
      losses: ranked.losses,
      totalGames,
      winrate,
      tournamentPoints,
    };
  }

  PLAYER_CACHE.set(cacheKey, {
    timestamp: Date.now(),
    data,
  });

  return data;
}

/* =========================
   SAFE CONCURRENCY POOL
========================= */

async function runWithConcurrency<T>(
  items: any[],
  limit: number,
  fn: (item: any) => Promise<T>,
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      const result = await fn(items[currentIndex]);
      if (result) results.push(result);
    }
  }

  const workers = Array.from({ length: limit }, () => worker());

  await Promise.all(workers);
  return results;
}

/* =========================
   TIER BUILDER
========================= */

function buildTierResult(players: any[]) {
  const ranking = buildRanking(players);
  const mvp = calculateMVP(ranking);

  return {
    players,
    ranking,
    mvp,
  };
}

/* =========================
   HANDLER
========================= */

export default async function handler(req: any, res: any) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const refreshRequested = req.query?.refresh === 'true';
    const now = Date.now();

    if (!refreshRequested && CACHE && now - LAST_UPDATE < CACHE_TTL) {
      return res.status(200).json({
        ...CACHE,
        fromCache: true,
      });
    }

    if (refreshRequested && CACHE && now - LAST_REFRESH < REFRESH_COOLDOWN) {
      return res.status(200).json({
        ...CACHE,
        fromCache: true,
        message: 'Refresh en cooldown',
      });
    }

    LAST_REFRESH = now;

    const allPlayers = await runWithConcurrency(
      TOURNAMENT_PLAYERS,
      CONCURRENCY_LIMIT,
      fetchPlayerData,
    );

    if (allPlayers.length !== TOURNAMENT_PLAYERS.length) {
      throw new Error(
        `Incomplete data: ${allPlayers.length}/${TOURNAMENT_PLAYERS.length}`,
      );
    }

    const tierAPlayers = allPlayers.filter((p) => p.group === 'A');
    const tierBPlayers = allPlayers.filter((p) => p.group === 'B');

    const payload = {
      updatedAt: new Date().toISOString(),
      tierA: buildTierResult(tierAPlayers),
      tierB: buildTierResult(tierBPlayers),
      fromCache: false,
    };

    CACHE = payload;
    LAST_UPDATE = now;

    return res.status(200).json(payload);
  } catch (error) {
    console.error('Tournament stats error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
