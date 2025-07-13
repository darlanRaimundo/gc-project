# 🎮 GC Project

GC Project é uma plataforma para pessoas se cadastrarem e encontrarem parceiros para diversos jogos.

---

## 🚀 Funcionalidades

- 👤 Cadastro de usuários
- 🎲 Busca de parceiros para jogos variados
- 🖥️ Interface moderna e responsiva

---

## 🛠️ Tecnologias

- **Frontend:** [Next.js](https://nextjs.org/) (React)
- **Backend:** [NestJS](https://nestjs.com/)
- **Monorepo:** [Nx](https://nx.dev/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** [MySQL](https://www.mysql.com/)

---

## ⚡ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [MySQL](https://www.mysql.com/) >= 8.x

---

## 🗄️ Configuração do Banco de Dados

1. Crie um banco de dados MySQL local ou utilize um serviço externo.
2. Copie o arquivo de exemplo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Edite o arquivo `.env` com as credenciais do seu banco de dados:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=gc_project
   ```
4. Certifique-se de que o banco de dados está rodando antes de iniciar o backend.

---

## 🌐 Configuração de ambiente do Frontend

Para que o frontend se comunique corretamente com o backend, crie um arquivo `.env.local` na pasta do frontend com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- Altere o valor conforme o endereço do seu backend.
- O frontend irá usar essa variável para todas as requisições à API.

---

## 🎮 Importação dos Jogos da Steam

Para popular o banco com os jogos da Steam, execute o script abaixo:

```bash
npm run import:steam
```

Esse comando irá buscar todos os jogos da Steam e cadastrá-los em lotes no banco de dados.

---

## ▶️ Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o backend:

   ```bash
   nx serve backend
   ```

3. Rode o frontend:
   ```bash
   nx serve frontend
   ```

---

## 🧪 Como rodar os testes

- Backend:
  ```bash
  nx test backend
  ```
- Frontend:
  ```bash
  nx test frontend
  ```

---

## 📚 Documentação da API

Após iniciar o backend, acesse a documentação Swagger dos endpoints em:

```
http://localhost:3000/api/docs
```

---

## 🤝 Como contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações e envie para o seu fork.
4. Abra um Pull Request.

Sinta-se à vontade para abrir issues ou pull requests!

---

## 🔗 Links úteis

- [Nx Documentation](https://nx.dev/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---
