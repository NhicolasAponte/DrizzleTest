// import * as fs from "fs";
// import * as path from "path";
import { faker } from "@faker-js/faker";
import { generate } from "random-words";
import { UserProfile } from "../data-model/schema-definitions";
import { usersSeed } from "../seed-data/seed-users";
import { saveSeedData } from "../lib/utils";

function generateRandomUserProfile(user_id: string): UserProfile {
  const id = Math.floor(Math.random() * 10000);
  const first_name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = `${generate(1)[0]}_company`;
  const accountNum = Math.random().toString(36).substring(7);
  // const phoneNum = `+1(${Math.floor(Math.random() * 9000000000) + 1000000000})`;
  let areaCode = Math.floor(Math.random() * 1000); //
  areaCode = areaCode > 99 ? areaCode : areaCode + 100;
  let digits = Math.floor(Math.random() * 1000);
  digits = digits > 99 ? digits : digits + 100;
  let lastFour = Math.floor(Math.random() * 10000);
  lastFour = lastFour > 999 ? lastFour : lastFour + 1000;
  const phoneNum = `+1(${areaCode})${digits}-${lastFour}`;
  return {
    profile_id: id,
    user_id,
    first_name,
    last_name: lastName,
    company,
    account_num: accountNum,
    phone_num: phoneNum,
  };
}

export function generateUserProfiles(outputDir?: string) {
  const profiles: UserProfile[] = [];
  for (let user of usersSeed) {
    profiles.push(generateRandomUserProfile(user.id));
  }

  // let dir = outputDir ? outputDir : "./src/seed-data";
  const dataType = "UserProfile";
  const arrayName = "profilesSeed";
  const fileName = "seed-user-profiles";

  saveSeedData(profiles, dataType, arrayName, fileName);

}

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(profiles, null, 2), "utf-8");
// console.log(`Generated ${profiles.length} profiles and saved to ${jsonPath}`);

// const tsContent = `import { UserProfile } from ${};\n\nexport const profilesSeedArray: UserProfile[] = ${JSON.stringify(
//   profiles,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(`Generated ${profiles.length} profiles and saved to ${tsPath}`);
