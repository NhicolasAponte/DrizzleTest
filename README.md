simple typescript project to use as a testing ground for Drizzle ORM 

I needed a way to quickly modify and update my database tables without triggering new builds and having to jump to 
Vercel and use their terrible database UI. I chose Drizzle because it feels somewhat like writing SQL and allows raw SQL. 
However, working with typescript and strongly typed queries and server actions means that I would get errors when making 
changes to type definitions. To avoid working with type errors throughout my project, I created this repo to be able to 
draft my database schema without making any breaking changes. 

steps to build project 

- initialize new node.js project: 
npm init -y
- install ts and the necessary type definitions: 
npm install typescript @types/node --save-dev
- initialize ts config file: 
npx tsc --init

- install tsx to 'watch' the ts files: 
npm install tsx --save-dev
- update package.json file:  
{
  "scripts": {
    "dev": "tsx watch src/main.ts"
  }
}

- run with: 
npm run dev

- install dotenv to manage environment variables 
npm i dotenv
- can optionally use loadEnvConfig from "@next/env": import { loadEnvConfig } from "@next/env";

https://orm.drizzle.team/docs/get-started-postgresql#postgresjs
- install drizzle and postgres.js driver: 
npm i drizzle-orm postgres
npm i -D drizzle-kit


instead of using tsx
- optional 
mkdir src
echo "console.log('Hello, TypeScript');" > src/index.ts
- To compile the TypeScript code, you can run:
 npx tsc
- This will compile the TypeScript files in the src directory into JavaScript files in the dist directory (or another directory specified in your tsconfig.json).

  To run the compiled JavaScript code, you can use:
node dist/index.js