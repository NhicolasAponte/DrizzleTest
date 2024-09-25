import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { users } from "../seed-data/users";
import { profiles } from "../seed-data/user-profiles";
import { UserProfile } from "./generate-user-profiles";

export type BillingInfo = {
  id: number;
  user_id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  payment_method: string;
  purchase_order: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  fax_num: string;
  is_primary: boolean;
  is_active: boolean;
};

function generateRandomBillingInfo(profile: UserProfile, email: string): BillingInfo {
    return {
        id: Math.floor(Math.random() * 1000),
        user_id: profile.user_id ,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        payment_method: faker.finance.transactionType(),
        purchase_order: faker.finance.accountNumber(),
        primary_contact_name: profile.first_name + " " + profile.last_name,
        primary_contact_email: email,
        primary_contact_phone: profile.phone_num!,
        fax_num: profile.phone_num!,
        is_primary: faker.datatype.boolean(),
        is_active: faker.datatype.boolean(),
    };
}

export function generateBillingInfo() {
  const billingInfoData: BillingInfo[] = [];
  for (let user of users) {
    const userProfile = profiles.find((profile) => user.id === profile.user_id); 
    userProfile ? billingInfoData.push(generateRandomBillingInfo(userProfile, user.email)) 
    : console.error(`No user profile found for user ${user.id}`); 
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}billing-info.json`;
  const tsPath = `${dir}billing-info.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(billingInfoData, null, 2),
    "utf-8"
  );
  console.log(
    `Generated ${billingInfoData.length} billing info and saved to ${jsonPath}`
  );

  const tsContent = `import { BillingInfo } from "../seed-functions/generate-billingInfo";\n\nexport const billingInfoArray: BillingInfo[] = ${JSON.stringify(
    billingInfoData,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(
    `Generated ${billingInfoData.length} billing info and saved to ${tsPath}`
  );
}
