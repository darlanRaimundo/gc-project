# GC Project

GC Project é uma plataforma para pessoas se cadastrarem e encontrarem parceiros para diversos jogos.

---

## Funcionalidades

- Cadastro de usuários
- Busca de parceiros para jogos variados
- Interface moderna e responsiva

---

## Tecnologias

- **Frontend:** [Next.js](https://nextjs.org/) (React)
- **Backend:** [NestJS](https://nestjs.com/)
- **Monorepo:** [Nx](https://nx.dev/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** [MySQL](https://www.mysql.com/)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [MySQL](https://www.mysql.com/) >= 8.x

---

## Instalação

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=gc_project
   ```

3. Crie o banco no MySQL:

   ```sql
   CREATE DATABASE gc_project;
   ```

4. Rode as migrations:

   ```bash
   npm run typeorm:migrate
   ```

---

## Configuração do Frontend

Para que o frontend se comunique com o backend, crie o arquivo `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Como Rodar

O Nx está instalado localmente no projeto. Por isso, use `npm run` ou `npx nx`; o comando `nx ...` sozinho só funciona se você tiver Nx instalado globalmente.

Para subir backend e frontend juntos:

```bash
npm run dev
```

URLs padrão:

- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`
- Frontend: o endereço mostrado pelo Next/Nx no terminal, normalmente `http://localhost:4200` ou `http://localhost:3001`

Para rodar separadamente:

```bash
npx nx serve backend
```

```bash
npx nx serve frontend
```

Se o Nx ficar preso em `Calculating the project graph on the Nx Daemon`, reinicie o daemon:

```bash
npx nx reset
```

Depois rode novamente:

```bash
npm run dev
```

---

## Importação dos Jogos da Steam

Para popular o banco com jogos da Steam, adicione também a chave da Steam no `.env`:

```env
STEAM_WEB_API_KEY=sua_chave_da_steam
```

A chave pode ser criada em:

```text
https://steamcommunity.com/dev/apikey
```

Depois execute:

```bash
npm run import:steam
```

Esse comando irá buscar todos os jogos da Steam e cadastrá-los em lotes no banco de dados.

Observação: esse comando pode levar bastante tempo.

## Importação das Categorias

Após importar os jogos, gere e salve todas as categorias extraídas dos jogos executando:

```bash
npm run save:categories
```

Observações:

- Certifique-se de que o banco de dados está rodando.
- Aplique as migrations antes de rodar o script:
  ```bash
  npm run typeorm:migrate
  ```
- O script lê os campos de categoria dos registros de jogos e insere apenas categorias novas.

---

## Como Rodar os Testes

- Backend:
  ```bash
  npx nx test backend
  ```
- Frontend:
  ```bash
  npx nx test frontend
  ```

---

## Documentação da API

Após iniciar o backend, acesse a documentação Swagger dos endpoints em:

```
http://localhost:3000/api/docs
```

---

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações e envie para o seu fork.
4. Abra um Pull Request.

Sinta-se à vontade para abrir issues ou pull requests!

---

## Links Úteis

- [Nx Documentation](https://nx.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---
