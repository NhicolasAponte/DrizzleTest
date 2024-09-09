import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

// Define the User type based on the UserTable schema
type User = {
  id: string;
  email: string;
  password: string;
  role: string;
};

// Function to generate random user data
function generateRandomUser(): User {
  const id = uuidv4();
  const email = `user_${Math.random().toString(36).substring(7)}@example.com`;
  const password = Math.random().toString(36).substring(7);
  const role = "USER"; // Default role as per the schema
  return { id, email, password, role };
}

// Function to generate user objects and write to a JSON file
export function generateUsers(numUsers: number, outputPath: string) {
  const users: User[] = [];
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
generateUsers(10, './seed-data/users.json');