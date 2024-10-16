import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { generate } from "random-words";
import { User } from "./type-definitions";

// Define the User type based on the UserTable schema

// Function to generate random user data
function generateRandomUser(): User {
  const id = uuidv4();
  const randWord = generate(2);
  // console.log("randWord: ", randWord);
  const email = `${randWord[0]}.${randWord[1]}@example.com`;
  //const email = `user_${Math.random().toString(36).substring(7)}@example.com`;
  const password = Math.random().toString(36).substring(7);
  const roleNum = Math.floor(Math.random() * 10);
  // console.log("roleNum: ", roleNum);
  const role = roleNum % 2 === 0 ? "USER" : "ADMIN"; // Default role as per the schema
  return { id, email, password, role };
}

// Function to generate user objects and write to a JSON file
export function generateUsers(numUsers: number, outputDir?: string) {
  const users: User[] = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(generateRandomUser());
  }

  const fileName = "users";
  const jsonFilePath = outputDir
    ? `${outputDir}/${fileName}.json`
    : `./src/seed-data/${fileName}.json`;
  const tsFilePath = outputDir
    ? `${outputDir}/${fileName}.ts`
    : `./src/seed-data/${fileName}.ts`;

  const outputDirectory = path.dirname(jsonFilePath);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify(users, null, 2), "utf-8");
  console.log(`Generated ${numUsers} users and saved to ${jsonFilePath}`);

  // Write to TypeScript file
  // create file content as string
  const tsContent = `import { User } from '../data-generating-functions/type-definitions';\n\nexport const users: User[] = ${JSON.stringify(
    users,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsFilePath, tsContent, "utf-8");
  console.log(`Generated ${numUsers} users and saved to ${tsFilePath}`);
}

// Example usage
//generateUsers(10, './seed-data/users.json');
