//import { db } from './db'; // Adjust the import according to your project structure
//import { ShippingInfoTable } from './schema'; // Adjust the import according to your project structure
import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { UserShippingInformation } from "./type-definitions";
import { usersSeedArray } from "../seed-data/seedUsers";
import { FlipCoin, saveSeedDataToFiles } from "../lib/utils";

function generateRandomAddress(userId: string): UserShippingInformation {
  return {
    id: Math.floor(Math.random() * 1000),
    user_id: userId,
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
  const shippingInfoData: UserShippingInformation[] = [];
  for (let user of usersSeedArray) {
    const numShippingInfo = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numShippingInfo; i++) {
      shippingInfoData.push(generateRandomAddress(user.id));
    }
  }

  let dataType = "UserShippingInformation";
  let arrayName = "shippingInfoSeedArray";

  const dir = "./src/seed-data";
  const fileName = "seedUserShippingInfo";

  let jsonPath = `${dir}/${fileName}.json`;
  let tsPath = `${dir}/${fileName}.ts`;
  let importLine = `import { UserShippingInformation } from "../data-generating-functions/type-definitions";\n`;

  saveSeedDataToFiles(
    shippingInfoData,
    dataType,
    arrayName,
    jsonPath,
    tsPath,
    importLine
  );

  if (outputDir) {
    jsonPath = `${outputDir}/${fileName}.json`;
    tsPath = `${outputDir}/${fileName}.ts`;
    importLine = `import { UserShippingInformation } from "../definitions/data-model";\n`;

    saveSeedDataToFiles(
      shippingInfoData,
      dataType,
      arrayName,
      jsonPath,
      tsPath,
      importLine
    );
  }
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

// const tsContent = `import { ShippingInfo } from "../data-generating-functions/type-definitions";\n\nexport const shippingInfoArray: ShippingInfo[] = ${JSON.stringify(
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
