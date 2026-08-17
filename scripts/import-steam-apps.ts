import { AppDataSource } from '../apps/backend/src/data-source';
import { Game } from '../apps/backend/src/game/game.entity';
import axios, { AxiosError } from 'axios';

type SteamStoreApp = {
  appid: number;
  name?: string;
};

type SteamStoreAppListResponse = {
  response?: {
    apps?: SteamStoreApp[];
    have_more_results?: boolean;
    last_appid?: number;
  };
};

const steamApiKey = process.env.STEAM_WEB_API_KEY;

async function fetchSteamApps(): Promise<SteamStoreApp[]> {
  if (!steamApiKey) {
    throw new Error('Defina STEAM_WEB_API_KEY no .env para importar a lista de apps da Steam.');
  }

  const apps: SteamStoreApp[] = [];
  let lastAppId: number | undefined;

  do {
    const response = await axios.get<SteamStoreAppListResponse>(
      'https://api.steampowered.com/IStoreService/GetAppList/v1/',
      {
        params: {
          key: steamApiKey,
          include_games: true,
          include_dlc: false,
          include_software: false,
          include_videos: false,
          include_hardware: false,
          max_results: 50000,
          ...(lastAppId ? { last_appid: lastAppId } : {}),
        },
      },
    );

    const pageApps = response.data.response?.apps ?? [];
    apps.push(...pageApps);
    lastAppId = response.data.response?.have_more_results
      ? response.data.response.last_appid
      : undefined;
  } while (lastAppId);

  return apps;
}

async function main() {
  const apps = await fetchSteamApps();

  await AppDataSource.initialize();

  try {
    const batchSize = 1000;
    for (let i = 0; i < apps.length; i += batchSize) {
      console.log(`Processando jogos ${i + 1} a ${Math.min(i + batchSize, apps.length)}...`);
      const batch: Game[] = [];
      for (const app of apps.slice(i, i + batchSize)) {
        let categorias: string[] = [];
        try {
          // Adiciona delay para evitar bloqueio por rate limit
          await new Promise((res) => setTimeout(res, 200));
          console.log(`Buscando detalhes do appid ${app.appid}...`);
          const details = await axios.get(
            `https://store.steampowered.com/api/appdetails?appids=${app.appid}`,
            {
              headers: { 'User-Agent': 'Mozilla/5.0' },
            },
          );
          const appDetails = details.data[app.appid];
          console.log(`Detalhes do appid ${app.appid} obtidos com sucesso.`);
          if (!appDetails?.success || !appDetails.data) {
            continue; // pula para o próximo app
          }
          const data = appDetails.data;
          categorias = data?.genres?.map((g: any) => g.description) || [];
          const header_image = data?.header_image || '';
          // Inclui apenas se for realmente um jogo
          if (app.name && categorias.length > 0 && data?.type === 'game') {
            batch.push({
              nome: app.name,
              appid: app.appid,
              provider: 'steam',
              categoria: categorias,
              header_image,
            } as Game);
          }
        } catch (err) {
          // ignora erro de requisição ou appid inválido
          console.log(`Erro ao buscar detalhes do appid ${app.appid}:`, err);
        }
      }

      if (batch.length > 0) {
        await AppDataSource.createQueryBuilder().insert().into(Game).values(batch).execute();
      }

      console.log(`Inseridos: ${i + batch.length} / ${apps.length}`);
    }
  } finally {
    await AppDataSource.destroy();
  }

  console.log('Importação finalizada!');
}

main().catch((err) => {
  if (err instanceof AxiosError && err.response?.status === 403) {
    console.error(
      'Erro na importação da Steam: acesso negado pela Steam. Verifique se STEAM_WEB_API_KEY é uma chave válida de https://steamcommunity.com/dev/apikey e se ela não está limitada a outro IP.',
    );
    process.exit(1);
  }

  const message = err instanceof Error ? err.message : err;
  console.error('Erro na importação da Steam:', message);
  process.exit(1);
});
