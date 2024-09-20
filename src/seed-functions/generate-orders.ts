import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";
import { users } from "../seed-data/users";
import { shippingInfoArray } from "../seed-data/shipping-info";
import { ShippingInfo } from "./generate-shippingInfo";
import { BillingInfo } from "./generate-billingInfo";
import { billingInfoArray } from "../seed-data/billing-info";
import { faker } from "@faker-js/faker";
import { date } from "drizzle-orm/mysql-core";

export type Order = {
  id: string;
  userId: string;
  orderName: string;
  billingInfo: BillingInfo;
  shippingInfo: ShippingInfo;
  status: string;
  dateCreated: string;
  dateUpdated: string;
  dateSubmitted?: string;
};

function generateRandomOrder(
  userId: string,
  billingInfo: BillingInfo,
  shippingInfo: ShippingInfo
): Order {
  const id = uuidv4();
  const orderName = generate(1)[0];
  const statusNum = Math.floor(Math.random() * 100);
  let status = "DRAFT";
  if (statusNum < 16) {
    status = "PENDING";
  } else if (statusNum < 31) {
    status = "DRAFT";
  } else if (statusNum < 46) {
    status = "QUOTE";
  } else if (statusNum < 61) {
    status = "PROCESSING";
  } else if (statusNum < 76) {
    status = "SHIPPED";
  } else if (statusNum < 91) {
    status = "DELIVERED";
  } else {
    status = "CANCELLED";
  }

  const dateCreated = faker.date.past({ years: 2 }).toLocaleString();
  let dateUpdated = undefined;
  let dateSubmitted = undefined;

  if (status != "DRAFT") {
    dateSubmitted = faker.date.recent({ days: 200 }).toLocaleString();
    while (dateSubmitted < dateCreated) {
      dateSubmitted = faker.date.recent({ days: 200 }).toLocaleString();
    }
    dateUpdated = dateSubmitted;
  } else {
    dateUpdated = faker.date.recent({ days: 200 }).toLocaleString();
    while (dateUpdated < dateCreated) {
      dateUpdated = faker.date.recent({ days: 100 }).toLocaleString();
    }
  }

  return {
    id,
    userId,
    orderName,
    billingInfo,
    shippingInfo,
    status,
    dateCreated,
    dateUpdated,
    dateSubmitted,
  };
}

// generate a random amount of orders for each user; anywhere between 2 and 10 orders
export function generateOrders() {
  const orders: Order[] = [];
  users.forEach((user) => {
    // range for number of order: 2 - 26 
    const numOrders = Math.floor(Math.random() * 25) + 2;
    console.log(`Generating ${numOrders} orders for user ${user.id}`);
    const shippingInfo = shippingInfoArray.find(
      (info) => info.userId === user.id
    );
    if (!shippingInfo) {
      console.error(`No shipping info found for user ${user.id}`);
      return;
    }
    const billingInfo = billingInfoArray.find(
      (info) => user.id === info.userId
    );
    if (!billingInfo) {
      console.error(`No billing info found for user ${user.id}`);
      return;
    }
    for (let i = 0; i < numOrders; i++) {
      orders.push(generateRandomOrder(user.id, billingInfo, shippingInfo));
    }
  });

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}orders.json`;
  const tsPath = `${dir}orders.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(orders, null, 2), "utf-8");
  console.log(`Generated ${orders.length} orders and saved to ${jsonPath}`);

  const tsContent = `import { Order } from "../seed-functions/generate-orders";\n\nexport const ordersArray: Order[] = ${JSON.stringify(
    orders,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${orders.length} orders and saved to ${tsPath}`);
}
