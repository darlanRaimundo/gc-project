import { AppDataSource } from '../apps/backend/src/data-source';
import { Game } from '../apps/backend/src/game/game.entity';
import { Category } from '../apps/backend/src/category/category.entity';

async function main() {
  // Inicializa a conexão com o banco (TypeORM)
  await AppDataSource.initialize();

  // 1) Carregar todos os jogos (apenas o campo 'categoria' para reduzir payload)
  //    Esta consulta busca somente o campo necessário para gerar as categorias.
  const games = await AppDataSource.getRepository(Game).find({
    select: ['categoria'],
  });

  // 2) Normalizar e coletar nomes únicos de categorias
  //    A função 'normalize' lida com diferentes formatos possíveis:
  //      - array de strings (já normalizado),
  //      - string simples,
  //      - string com vários itens separados por vírgula.
  //    Remove valores falsy e espaços em branco das bordas.
  const uniq = new Set<string>();
  const normalize = (value: any) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean).map((v) => String(v).trim());
    if (typeof value === 'string') {
      // Se for uma string com vírgulas, dividir em múltiplos nomes
      if (value.includes(','))
        return value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      // Caso contrário, retornar como um único elemento
      return [value.trim()];
    }
    return [];
  };

  for (const g of games) {
    const cats = normalize((g as any).categoria);
    for (const c of cats) uniq.add(c);
  }

  // 3) Filtrar categorias que já existem no banco para evitar duplicação
  //    Buscamos os nomes existentes e comparamos usando um Set para performance.
  const categoryRepo = AppDataSource.getRepository(Category);
  const existing = await categoryRepo.find({ select: ['nome'] });
  const existingSet = new Set(existing.map((e: any) => String(e.nome).trim()));

  const newCategories = Array.from(uniq).filter((c) => !existingSet.has(c));
  console.log(
    `Categorias totais encontradas: ${uniq.size}. Novas para inserir: ${newCategories.length}`,
  );

  // 4) Inserir novas categorias em lotes (para eficiência)
  //    Utilizamos batches para reduzir número de queries e tratamos falhas
  //    tentando inserir item a item caso a inserção em bloco falhe.
  const batchSize = 1000;
  for (let i = 0; i < newCategories.length; i += batchSize) {
    const batch = newCategories.slice(i, i + batchSize).map((nome) => {
      // Ajuste de campos conforme a entidade Category do projeto.
      return {
        nome
      } as Partial<Category>;
    });

    if (batch.length === 0) continue;

    try {
      // Inserção em bloco usando QueryBuilder
      await AppDataSource.createQueryBuilder().insert().into(Category).values(batch).execute();
      console.log(`Inseridos categorias ${i + 1} a ${i + batch.length}`);
    } catch (err) {
      // Em caso de erro no batch, tentar inserir item a item para identificar problemas pontuais
      console.log('Erro ao inserir batch de categorias:', err);
      for (const item of batch) {
        try {
          await AppDataSource.createQueryBuilder().insert().into(Category).values(item).execute();
        } catch (e) {
          // Log detalhado do item que falhou para facilitar depuração
          console.log('Erro ao inserir categoria:', item, e);
        }
      }
    }
  }

  // Encerra a conexão com o datasource
  await AppDataSource.destroy();
  console.log('Persistência de categorias concluída!');
}

main().catch((err) => {
  console.error('Erro no script de salvar categorias:', err);
  process.exit(1);
});
