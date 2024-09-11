import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { generate } from "random-words";
import { users } from "../seed-data/users";

export type UserProfile = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  company?: string;
  accountNum?: string;
  phoneNum?: string;
};

function generateRandomUserProfile(userId: string): UserProfile {
  const id = Math.floor(Math.random() * 10000);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = `${generate(1)[0]}_company`;
  const accountNum = Math.random().toString(36).substring(7);
  // const phoneNum = `+1(${Math.floor(Math.random() * 9000000000) + 1000000000})`;
  let areaCode = Math.floor(Math.random() * 1000); // 
  areaCode = areaCode > 99 ? areaCode : areaCode + 100
  let digits = Math.floor(Math.random() * 1000)
  digits = digits > 99 ? digits : digits + 100;
  let lastFour = Math.floor(Math.random() * 10000);
  lastFour = lastFour > 999 ? lastFour : lastFour + 1000;
  const phoneNum = `+1(${areaCode})${digits}-${lastFour}`;
  return { id, userId, firstName, lastName, company, accountNum, phoneNum };
}

export function generateUserProfiles() {
  const profiles: UserProfile[] = [];
  for (let user of users) {
    profiles.push(generateRandomUserProfile(user.id));
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}user-profiles.json`;
  const tsPath = `${dir}user-profiles.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(profiles, null, 2), "utf-8");
  console.log(`Generated ${profiles.length} profiles and saved to ${jsonPath}`);

  const tsContent = `import { UserProfile } from "../seed-functions/generate-user-profiles";\n\nexport const profiles: UserProfile[] = ${JSON.stringify(
    profiles,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${profiles.length} profiles and saved to ${tsPath}`);
}
