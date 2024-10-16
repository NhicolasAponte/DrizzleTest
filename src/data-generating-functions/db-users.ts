import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

// Function to generate random user data
function generateRandomUser() {
  const id = uuidv4();
  const name = `User_${Math.random().toString(36).substring(7)}`;
  const email = `${name}@example.com`;
  const phone = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  return { id, name, email, phone };
}

// Function to generate user objects and write to a JSON file
function generateUsers(numUsers: number, outputPath: string) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(generateRandomUser());
  }

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(users, null, 2), 'utf-8');
  console.log(`Generated ${numUsers} users and saved to ${outputPath}`);
}

// Example usage
generateUsers(10, './output/users.json');