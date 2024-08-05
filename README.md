simple typescript project to use as a testing ground for Drizzle ORM 

steps to build project 

- initialize new node.js project 
npm init -y
- install ts and the necessary type definitions 
npm install typescript @types/node --save-dev
initialize ts config file 
npx tsc --init

-install tsx to 'watch' the ts files 
npm install tsx --save-dev
- update package.json file 
{
  "scripts": {
    "dev": "tsx watch src/main.ts"
  }
}

- run with
npm run dev

instead of using tsx
- optional 
mkdir src
echo "console.log('Hello, TypeScript');" > src/index.ts
- To compile the TypeScript code, you can run:
 npx tsc
- This will compile the TypeScript files in the src directory into JavaScript files in the dist directory (or another directory specified in your tsconfig.json).

  To run the compiled JavaScript code, you can use:
node dist/index.js