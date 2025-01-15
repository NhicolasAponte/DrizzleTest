//import { db } from './db'; // Adjust the import according to your project structure
//import { ShippingInfoTable } from './schema'; // Adjust the import according to your project structure 
import { faker } from "@faker-js/faker";
import { CustomerShippingInformation } from "../data-model/schema-definitions";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { customersSeed } from "../seed/data/customers";

function generateRandomAddress(customer_id: string): CustomerShippingInformation {
  return {
    shipping_info_id: Math.floor(Math.random() * 1000),
    customer_id: customer_id,
    street: faker.location.streetAddress(false),
    apt_num: FlipCoin() ? faker.location.secondaryAddress() : null,
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    is_job_site: faker.datatype.boolean(),
    note: faker.lorem.sentence(),
  };
}

export function generateShippingInfo(outputDir?: string) {
  const shippingInfoData: CustomerShippingInformation[] = [];
  for (let customer of customersSeed) {
    const numShippingInfo = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numShippingInfo; i++) {
      shippingInfoData.push(generateRandomAddress(customer.customer_id));
    }
  }

  const dataType = "CustomerShippingInformation";
  const arrayName = "shippingInfoSeed";
  const fileName = "customer-shipping-info";

  saveSeedData(shippingInfoData, dataType, arrayName, fileName);
}

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(
//   jsonPath,
//   JSON.stringify(shippingInfoData, null, 2),
//   "utf-8"
// );
// console.log(
//   `Generated ${shippingInfoData.length} shipping info and saved to ${jsonPath}`
// );

// const tsContent = `import { ShippingInfo } from ${};\n\nexport const shippingInfoArray: ShippingInfo[] = ${JSON.stringify(
//   shippingInfoData,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(
//   `Generated ${shippingInfoData.length} shipping info and saved to ${tsPath}`
// );

// Generate fake data for 3 ShippingInfoTable objects
// const shippingInfoData = [
//   {
//     userId: faker.datatype.uuid(),
//     address: faker.address.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.state(),
//     zip: faker.address.zipCode(),
//     isJobSite: faker.datatype.boolean(),
//     note: faker.lorem.sentence(),
//   },
//   {
//     userId: faker.datatype.uuid(),
//     address: faker.address.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.state(),
//     zip: faker.address.zipCode(),
//     isJobSite: faker.datatype.boolean(),
//     note: faker.lorem.sentence(),
//   },
//   {
//     userId: faker.datatype.uuid(),
//     address: faker.address.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.state(),
//     zip: faker.address.zipCode(),
//     isJobSite: faker.datatype.boolean(),
//     note: faker.lorem.sentence(),
//   },
// ];

// // Insert the fake data into the ShippingInfoTable
// async function populateShippingInfoTable() {
//   for (const data of shippingInfoData) {
//     await db.insert(ShippingInfoTable).values(data).execute();
//   }
// }

// populateShippingInfoTable().then(() => {
//   console.log('ShippingInfoTable populated with fake data');
// }).catch((error) => {
//   console.error('Error populating ShippingInfoTable:', error);
// });
