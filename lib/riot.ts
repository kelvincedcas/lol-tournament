import { SoloQRanked } from '../types/riot';

const API_KEY = process.env.RIOT_API_KEY!;
const AMERICAS = 'https://americas.api.riotgames.com';
const LA1 = 'https://la1.api.riotgames.com';

async function riotFetch(url: string) {
  const res = await fetch(url, {
    headers: {
      'X-Riot-Token': API_KEY,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    const error: any = new Error(`Riot API error ${res.status}: ${text}`);
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function getPuuid(gameName: string, tagLine: string) {
  const data = await riotFetch(
    `${AMERICAS}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName,
    )}/${encodeURIComponent(tagLine)}`,
  );

  return data.puuid as string;
}

export async function getSoloQByPuuid(
  puuid: string,
): Promise<SoloQRanked | null> {
  const leagues = await riotFetch(
    `${LA1}/lol/league/v4/entries/by-puuid/${puuid}`,
  );

  return leagues.find((l: any) => l.queueType === 'RANKED_SOLO_5x5') || null;
}

export async function isPlayerInGame(puuid: string): Promise<boolean> {
  try {
    await riotFetch(
      `${LA1}/lol/spectator/v5/active-games/by-summoner/${puuid}`,
    );
    return true;
  } catch (err: any) {
    if (err?.status === 404) {
      return false; // no está en partida
    }

    if (err?.status === 403) {
      console.warn('Spectator forbidden for puuid:', puuid);
      return false;
    }

    throw err;
  }
}
