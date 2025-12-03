# 🍽️ Daily Diet API

Uma API completa desenvolvida com **Node.js**, **TypeScript**,
**Fastify** e **Prisma**, com foco em controle de refeições e métricas
de dieta.

## 🚀 Tecnologias Utilizadas

-   Node.js
-   TypeScript
-   Fastify
-   Prisma ORM
-   PostgreSQL
-   Docker
-   Zod
-   JWT Authentication

## 📌 Funcionalidades Principais

### ✔️ **Usuarios**

-   Cadastro de usuário
-   Login com JWT
-   Rotas protegidas

### ✔️ **Refeições**

-   Criar refeição
-   Editar refeição
-   Apagar refeição
-   Listar refeições
-   Buscar refeição por ID

### ✔️ **Métricas**

-   Total de refeições cadastradas
-   Total de refeições dentro da dieta
-   Total de refeições fora da dieta
-   **Melhor sequência de refeições dentro da dieta (best sequence)**

## 📊 Endpoint de Métricas (Resumo)

O sistema retorna:

``` json
{
  "totalMeals": 10,
  "totalMealsOnDiet": 7,
  "totalMealsOffDiet": 3,
  "bestSequence": 4
}
```

## 📁 Estrutura do Projeto

    src/
     ├── @types/
     ├── controllers/
     ├── env/
     ├── lib/
     ├── middleware/
     ├── routes/
     ├── app.ts
     └── server.ts

## 🧠 Lógica da Melhor Sequência

Percorre todas as refeições em ordem cronológica:
- Se a refeição é "on_diet", aumenta a sequência atual
- Se não for, zera a contagem
- Sempre compara com a maior sequência registrada

------------------------------------------------------------------------

## 👨‍💻 Desenvolvedor

**João Victor**\
🔗 LinkedIn: www.linkedin.com/in/dev-joaovictor
🐙 GitHub: https://github.com/Developer-JoaoVictor

------------------------------------------------------------------------

## 📜 Licença

Este projeto é open-source e você pode usá-lo como quiser.