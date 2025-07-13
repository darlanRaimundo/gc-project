import { AppDataSource } from '../apps/backend/src/data-source';
import { Game } from '../apps/backend/src/game/game.entity';
import axios from 'axios';

async function main() {
  await AppDataSource.initialize();

  const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
  const apps = response.data.applist.apps;

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

    await AppDataSource.createQueryBuilder().insert().into(Game).values(batch).execute();

    console.log(`Inseridos: ${i + batch.length} / ${apps.length}`);
  }

  await AppDataSource.destroy();
  console.log('Importação finalizada!');
}

main();
