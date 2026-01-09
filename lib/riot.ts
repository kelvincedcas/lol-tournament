const RIOT_REGION = 'americas';
const LOL_REGION = 'la1';

const RIOT_HEADERS = {
  'X-Riot-Token': process.env.RIOT_API_KEY as string,
};

async function riotFetch(url: string) {
  const res = await fetch(url, { headers: RIOT_HEADERS });

  if (!res.ok) {
    throw new Error(`Riot API error ${res.status}`);
  }

  return res.json();
}

export async function getPuuid(gameName: string, tag: string) {
  const data = await riotFetch(
    `https://${RIOT_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`,
  );
  return data.puuid;
}

export async function getSummonerId(puuid: string) {
  const data = await riotFetch(
    `https://${LOL_REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  );
  return data.id;
}

export async function getSoloQ(summonerId: string) {
  const entries = await riotFetch(
    `https://${LOL_REGION}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
  );

  return entries.find((e: any) => e.queueType === 'RANKED_SOLO_5x5');
}
