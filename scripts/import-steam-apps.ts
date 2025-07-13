import { AppDataSource } from '../apps/backend/src/data-source';
import { Game } from '../apps/backend/src/game/game.entity';
import axios from 'axios';

async function main() {
  await AppDataSource.initialize();

  const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
  const apps = response.data.applist.apps;

  const batchSize = 1000;
  for (let i = 0; i < apps.length; i += batchSize) {
    const batch = apps.slice(i, i + batchSize)
      .map((app: any) => ({
        nome: app.name,
        categoria: 'Steam',
      }))
      .filter((g: any) => g.nome);

    await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Game)
      .values(batch)
      .execute();

    console.log(`Inseridos: ${i + batch.length} / ${apps.length}`);
  }

  await AppDataSource.destroy();
  console.log('Importação finalizada!');
}

main();
