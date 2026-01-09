import { TOURNAMENT_PLAYERS } from '../lib/players.js';
import { getPuuid, getSummonerId, getSoloQ } from '../lib/riot.js';
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

/* =========================
   GLOBAL CACHE
========================= */

let CACHE: any = null;
let LAST_UPDATE = 0;
let LAST_REFRESH = 0;

const CACHE_TTL = 1000 * 60 * 10; // 10 min
const REFRESH_COOLDOWN = 1000 * 60 * 10;

/* =========================
   PLAYER CACHE
========================= */

const PLAYER_CACHE = new Map<string, { timestamp: number; data: any }>();

/* =========================
   RIOT HELPERS
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

  const summonerId = await withRetry(() => getSummonerId(puuid));

  const ranked = await withRetry(() => getSoloQ(summonerId));

  if (!ranked) return null;

  const totalGames = ranked.wins + ranked.losses;
  const winrate =
    totalGames > 0 ? Number(((ranked.wins / totalGames) * 100).toFixed(2)) : 0;

  const tournamentPoints = calculateTournamentPoints(
    ranked.tier,
    ranked.rank,
    ranked.leaguePoints,
  );

  const data = {
    nickname: p.nickname,
    role: p.role,
    tier: ranked.tier,
    rank: ranked.rank,
    lp: ranked.leaguePoints,
    wins: ranked.wins,
    losses: ranked.losses,
    totalGames,
    winrate,
    tournamentPoints,
  };

  PLAYER_CACHE.set(cacheKey, {
    timestamp: Date.now(),
    data,
  });

  return data;
}

/* =========================
   CONCURRENCY CONTROL
========================= */

async function runWithConcurrency<T>(
  items: any[],
  limit: number,
  fn: (item: any) => Promise<T>,
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const p = fn(item).then((r) => {
      if (r) results.push(r);
    });

    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((e) => e === p),
        1,
      );
    }
  }

  await Promise.all(executing);
  return results;
}

/* =========================
   HANDLER (NODE SERVERLESS)
========================= */

export default async function handler(request: any, response: any) {
  try {
    const refreshRequested = request.query?.refresh === 'true';
    const now = Date.now();

    /* =========================
       GLOBAL CACHE
    ========================= */

    if (!refreshRequested && CACHE && now - LAST_UPDATE < CACHE_TTL) {
      return response.status(200).json({ ...CACHE, fromCache: true });
    }

    if (refreshRequested && CACHE && now - LAST_REFRESH < REFRESH_COOLDOWN) {
      return response.status(200).json({
        ...CACHE,
        fromCache: true,
        message: 'Refresh en cooldown',
      });
    }

    LAST_REFRESH = now;

    /* =========================
       DATA FETCH
    ========================= */

    const players = await runWithConcurrency(
      TOURNAMENT_PLAYERS,
      CONCURRENCY_LIMIT,
      fetchPlayerData,
    );

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

    return response.status(200).json(payload);
  } catch (error) {
    console.error('Handler error:', error);
    return response.status(500).json({
      error: 'Internal server error',
    });
  }
}
