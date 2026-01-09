const RIOT_REGION = process.env.RIOT_REGION!;
const RIOT_PLATFORM = process.env.RIOT_PLATFORM!;
const API_KEY = process.env.RIOT_API_KEY!;

async function riotFetch(url: string) {
  const res = await fetch(url, {
    headers: {
      'X-Riot-Token': API_KEY,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Riot API error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getPuuid(gameName: string, tag: string) {
  return riotFetch(
    `https://${RIOT_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName,
    )}/${tag}`,
  ).then((d) => d.puuid);
}

export async function getSummonerId(puuid: string) {
  return riotFetch(
    `https://${RIOT_PLATFORM}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  ).then((d) => d.id);
}

export async function getSoloQ(summonerId: string) {
  const leagues = await riotFetch(
    `https://${RIOT_PLATFORM}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
  );

  return leagues.find((l: any) => l.queueType === 'RANKED_SOLO_5x5');
}
