# Simple TypeScript Project for Drizzle ORM Testing

I needed a way to quickly modify and update my database tables without triggering new builds and having to jump to Vercel and use their terrible database UI. I chose Drizzle because it feels somewhat like writing SQL and allows raw SQL. However, working with TypeScript and strongly typed queries and server actions means that I would get errors when making changes to type definitions. To avoid working with type errors throughout my project, I created this repo to be able to draft my database schema without making any breaking changes.

## Steps to Build Project

1. **Initialize new Node.js project:**
    ```bash
    npm init -y
    ```

2. **Install TypeScript and the necessary type definitions:**
    ```bash
    npm install typescript @types/node --save-dev
    ```

3. **Initialize TypeScript config file:**
    ```bash
    npx tsc --init
    ```

4. **Install `tsx` to 'watch' the TypeScript files:**
    ```bash
    npm install tsx --save-dev
    ```

5. **Update `package.json` file:**
    ```json
    {
      "scripts": {
        "dev": "tsx watch src/main.ts"
      }
    }
    ```

6. **Run with:**
    ```bash
    npm run dev
    ```

7. **Install `dotenv` to manage environment variables:**
    ```bash
    npm i dotenv
    ```
    - Can optionally use [`loadEnvConfig`](command:_github.copilot.openSymbolFromReferences?%5B%22loadEnvConfig%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cnflores%5C%5CDesktop%5C%5Cdev%5C%5CTest%5C%5CDrizzleTest%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A31%2C%22character%22%3A21%7D%7D%5D%5D "Go to definition") from `@next/env`:
      ```typescript
      import { loadEnvConfig } from "@next/env";
      ```

8. **Install Drizzle and Postgres.js driver:**
    ```bash
    npm i drizzle-orm postgres
    npm i -D drizzle-kit
    ```

    [Drizzle ORM Documentation](https://orm.drizzle.team/docs/get-started-postgresql#postgresjs)

## Optional Steps

- **Create [`src`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2Fsrc%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nflores\Desktop\dev\Test\DrizzleTest\src") directory and add a sample TypeScript file:**
    ```bash
    mkdir src
    echo "console.log('Hello, TypeScript');" > src/index.ts
    ```

- **To compile the TypeScript code, you can run:**
    ```bash
    npx tsc
    ```
    - This will compile the TypeScript files in the [`src`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2Fsrc%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nflores\Desktop\dev\Test\DrizzleTest\src") directory into JavaScript files in the [`dist`](command:_github.copilot.openSymbolFromReferences?%5B%22dist%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cnflores%5C%5CDesktop%5C%5Cdev%5C%5CTest%5C%5CDrizzleTest%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A45%2C%22character%22%3A91%7D%7D%5D%5D "Go to definition") directory (or another directory specified in your [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fnflores%2FDesktop%2Fdev%2FTest%2FDrizzleTest%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nflores\Desktop\dev\Test\DrizzleTest\tsconfig.json")).

- **To run the compiled JavaScript code, you can use:**
    ```bash
    node dist/index.js
    ```