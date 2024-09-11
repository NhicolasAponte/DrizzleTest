import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { users } from "../seed-data/users";
import { profiles } from "../seed-data/user-profiles";
import { UserProfile } from "./generate-user-profiles";

export type BillingInfo = {
  id: number;
  userId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: string;
  purchaseOrder: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  faxNum: string;
  isPrimary: boolean;
  isActive: boolean;
};

function generateRandomBillingInfo(profile: UserProfile, email: string): BillingInfo {
    return {
        id: Math.floor(Math.random() * 1000),
        userId: profile.userId ,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        paymentMethod: faker.finance.transactionType(),
        purchaseOrder: faker.finance.accountNumber(),
        primaryContactName: profile.firstName + " " + profile.lastName,
        primaryContactEmail: email,
        primaryContactPhone: profile.phoneNum!,
        faxNum: profile.phoneNum!,
        isPrimary: faker.datatype.boolean(),
        isActive: faker.datatype.boolean(),
    };
}

export function generateBillingInfo() {
  const billingInfoData: BillingInfo[] = [];
  for (let user of users) {
    const userProfile = profiles.find((profile) => user.id === profile.userId); 
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
