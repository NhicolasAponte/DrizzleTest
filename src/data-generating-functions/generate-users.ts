import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { generate } from "random-words";
import { User, UserRole } from "./type-definitions";

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
  const role = roleNum % 2 === 0 ? "User" : "Admin"; // Default role as per the schema
  return { id, email, password, role: role as UserRole };
}

// Function to generate user objects and write to a JSON file
export function generateUsers(numUsers: number, outputDir?: string) {
  const users: User[] = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(generateRandomUser());
  }

  const dataType = "User";
  const arrayName = "usersSeed";

  const dir = "./src/seed-data";
  const fileName = "seed-users";

  let jsonPath = `${dir}/${fileName}.json`;
  let tsPath = `${dir}/${fileName}.ts`;
  let importLine = `import { User, UserRole } from '../data-generating-functions/type-definitions';\n`;

  saveUserSeedDataToFiles(
    users,
    dataType,
    arrayName,
    jsonPath,
    tsPath,
    importLine
  );

  if (outputDir) {
    jsonPath = `${outputDir}/${fileName}.json`;
    tsPath = `${outputDir}/${fileName}.ts`;
    importLine = `import { User, UserRole } from "../definitions/data-model";\n`;
    saveUserSeedDataToFiles(
      users,
      dataType,
      arrayName,
      jsonPath,
      tsPath,
      importLine
    );
  }
  // // check if directory exists, if not create it
  // const outputDirectory = path.dirname(jsonPath);
  // if (!fs.existsSync(outputDirectory)) {
  //   fs.mkdirSync(outputDirectory, { recursive: true });
  // }
  // // write to json file in specified directory
  // fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2), "utf-8");
  // console.log(`Generated ${users.length} users and saved to ${jsonPath}`);

  // // write to typescript file
  // // create file content as string
  // const tsContent = `import { User } from '../data-generating-functions/type-definitions';\n\nexport const usersSeedArray: User[] = ${JSON.stringify(
  //   users,
  //   null,
  //   2
  // )};\n`;
  // fs.writeFileSync(tsPath, tsContent, "utf-8");
  // console.log(`Generated ${users.length} users and saved to ${tsPath}`);
}

// Example usage
//generateUsers(10, './seed-data/users.json');

export function saveUserSeedDataToFiles(
  data: any,
  dataType: string,
  arrayName: string,
  jsonPath: string,
  tsPath: string,
  importLine: string
) {
  // check if directory exists, if not create it
  const outputDirectory = path.dirname(jsonPath);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  // write to json file in specified directory
  // fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
  // console.log(`Generated ${data.length} ${dataType}s and saved to ${jsonPath}`);

  // write to typescript file
  // create file content as string
  const tsContent = `${importLine}\nexport const ${arrayName}: ${dataType}[] = [\n${data
    .map((user: User) => {
      return `  {
    id: "${user.id}",
    email: "${user.email}",
    password: "${user.password}",
    role: UserRole.${user.role},\n  }`;
    })
    .join(",\n")}\n];\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${data.length} ${dataType}s and saved to ${tsPath}`);
}
