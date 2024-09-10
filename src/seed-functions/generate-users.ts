import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { generate } from "random-words";

// Define the User type based on the UserTable schema
export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
};

// Function to generate random user data
function generateRandomUser(): User {
  const id = uuidv4();
  const randWord = generate(2);
  console.log("randWord: ", randWord);
  const email = `${randWord[0]}.${randWord[1]}@example.com`;
  //const email = `user_${Math.random().toString(36).substring(7)}@example.com`;
  const password = Math.random().toString(36).substring(7);
  const roleNum = Math.floor(Math.random() * 10);
  // console.log("roleNum: ", roleNum);
  const role = roleNum % 2 === 0 ? "USER" : "ADMIN"; // Default role as per the schema
  return { id, email, password, role };
}

// Function to generate user objects and write to a JSON file
export function generateUsers(numUsers: number, outputPath?: string) {
  const users: User[] = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(generateRandomUser());
  }

  const fileName = "users";
  const jsonOutputPath = outputPath
    ? `${outputPath}${fileName}.json`
    : `./src/seed-data/${fileName}.json`;
  const tsOutputPath = outputPath
    ? `${outputPath}${fileName}.ts`
    : `./src/seed-data/${fileName}.ts`;

  const outputDir = path.dirname(jsonOutputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonOutputPath, JSON.stringify(users, null, 2), "utf-8");
  console.log(`Generated ${numUsers} users and saved to ${jsonOutputPath}`);

  // Write to TypeScript file
  // create file content as string
  const tsContent = `import { User } from '../seed-functions/generate-users';\n\nexport const users: User[] = ${JSON.stringify(
    users,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsOutputPath, tsContent, "utf-8");
  console.log(`Generated ${numUsers} users and saved to ${tsOutputPath}`);
}

// Example usage
//generateUsers(10, './seed-data/users.json');
