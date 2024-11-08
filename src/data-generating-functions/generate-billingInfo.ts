import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import {
  UserBillingInformation,
  UserProfile,
  payment_method_codes,
} from "../data-model/schema-definitions";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { usersSeed } from "../seed-data/seed-users";
import { profilesSeed } from "../seed-data/seed-user-profiles";

function generateRandomBillingInfo(
  profile: UserProfile,
  email: string
): UserBillingInformation {
  return {
    billing_info_id: Math.floor(Math.random() * 1000),
    user_id: profile.user_id,
    street: faker.location.streetAddress(false),
    apt_num: FlipCoin() ? faker.location.secondaryAddress() : null,
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    payment_method:
      payment_method_codes[
        Math.floor(Math.random() * payment_method_codes.length)
      ],
    purchase_order: faker.finance.accountNumber(),
    primary_contact_name: profile.first_name + " " + profile.last_name,
    primary_contact_email: email,
    primary_contact_phone: profile.phone_num!,
    fax_num: profile.phone_num!,
    is_primary: faker.datatype.boolean(),
    is_active: faker.datatype.boolean(),
  };
}

export function generateBillingInfo(outputDir?: string) {
  const billingInfoData: UserBillingInformation[] = [];
  for (let user of usersSeed) {
    const numBillingInfo = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numBillingInfo; i++) {
      const userProfile = profilesSeed.find(
        (profile) => user.user_id === profile.user_id
      );
      userProfile
        ? billingInfoData.push(
            generateRandomBillingInfo(userProfile, user.email)
          )
        : console.error(`No user profile found for user ${user.user_id}`);
    }
  }

  const dataType = "UserBillingInformation";
  const arrayName = "billingInfoSeed";
  const fileName = "seed-user-billing-info";

  saveSeedData(billingInfoData, dataType, arrayName, fileName);
}

// const altTS = `${importLine}\nexport const ${arrayName}: ${dataType}[] = [\n${billingInfoData
// .map((billingInfo: UserBillingInformation) => {
//   return `  {
//   id: ${billingInfo.id},
//   user_id: "${billingInfo.user_id}",
//   street: "${billingInfo.street}",
//   apt_num: ${billingInfo.apt_num ? `"${billingInfo.apt_num}"` : null},
//   city: "${billingInfo.city}",
//   state: "${billingInfo.state}",
//   zip: "${billingInfo.zip}",
//   payment_method: "${billingInfo.payment_method}",
//   purchase_order: "${billingInfo.purchase_order}",
//   primary_contact_name: "${billingInfo.primary_contact_name}",
//   primary_contact_email: "${billingInfo.primary_contact_email}",
//   primary_contact_phone: "${billingInfo.primary_contact_phone}",
//   fax_num: "${billingInfo.fax_num}",
//   is_primary: ${billingInfo.is_primary},
//   is_active: ${billingInfo.is_active}
// \n  }`;
// })
// .join(",\n")}\n];\n`;

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(billingInfoData, null, 2), "utf-8");
// console.log(
//   `Generated ${billingInfoData.length} billing info and saved to ${jsonPath}`
// );

// const tsContent = `import { BillingInfo } from ${};\n\nexport const billingInfoArray: BillingInfo[] = ${JSON.stringify(
//   billingInfoData,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(
//   `Generated ${billingInfoData.length} billing info and saved to ${tsPath}`
// );
