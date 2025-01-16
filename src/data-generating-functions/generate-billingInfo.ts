import { faker } from "@faker-js/faker";
import {
  Customer,
  CustomerBillingInformation,
  payment_method_codes,
} from "../data-model/schema-definitions";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { customersSeed } from "../seed/data/customers";

function generateRandomBillingInfo(
  customer: Customer
): CustomerBillingInformation {
  return {
    billing_info_id: Math.floor(Math.random() * 1000),
    customer_id: customer.customer_id,
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
    primary_contact_name: customer.name,
    primary_contact_email: customer.email,
    primary_contact_phone: customer.phone,
    fax_num: customer.phone,
    is_primary: faker.datatype.boolean(),
    is_active: faker.datatype.boolean(),
  };
}

export function generateBillingInfo(outputDir?: string) {
  const billingInfoData: CustomerBillingInformation[] = [];
  for (let customer of customersSeed) {
    const numBillingInfo = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numBillingInfo; i++) {
      billingInfoData.push(generateRandomBillingInfo(customer));
    }
  }

  const dataType = "CustomerBillingInformation";
  const arrayName = "billingInfoSeed";
  const fileName = "customer-billing-info";

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
