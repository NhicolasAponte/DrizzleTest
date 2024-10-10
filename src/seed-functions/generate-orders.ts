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

export type Order = {
  id: string;
  user_id: string;
  order_name: string;
  billing_info: BillingInfo;
  shipping_info: ShippingInfo;
  status: string;
  date_created: Date;
  date_updated: Date;
  date_submitted?: Date;
  date_shipped?: Date; 
  date_delivered?: Date; 
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

  const dateCreated = faker.date.past({ years: 2 })//.toLocaleString();
  let dateUpdated = undefined;
  let dateSubmitted = undefined;
  let dateShipped = undefined;
  let dateDelivered = undefined;

  if (status != "DRAFT") {
    dateSubmitted = faker.date.soon({ days: 65, refDate: dateCreated })//.toLocaleString();
    // while (dateSubmitted < dateCreated) {
    //   dateSubmitted = faker.date.recent({ days: 200 })//.toLocaleString();
    // }
    dateUpdated = dateSubmitted;
  } else {
    dateUpdated = faker.date.recent({ days: 200 })//.toLocaleString();
    while (dateUpdated < dateCreated) {
      dateUpdated = faker.date.recent({ days: 100 })//.toLocaleString();
    }
  }

  if (status === "SHIPPED" && dateSubmitted) {
    dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted})//.toLocaleString();
    while (dateShipped < dateSubmitted) {
      //dateShipped = faker.date.recent({ days: 200 }).toLocaleString();
      dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted})
    }
  }

  if (status === "DELIVERED" && dateShipped) {
    dateDelivered = faker.date.soon({ days: 12, refDate: dateShipped});
  }

  return {
    id,
    user_id: userId,
    order_name: orderName,
    billing_info: billingInfo,
    shipping_info: shippingInfo,
    status,
    date_created: dateCreated,
    date_updated: dateUpdated,
    date_submitted: dateSubmitted,
    date_shipped: dateShipped,
    date_delivered: dateDelivered
  };
}

// generate a random amount of orders for each user; anywhere between 2 and 10 orders
export function generateOrders() {
  const orders: Order[] = [];
  users.forEach((user) => {
    // range for number of order: 2 - 26
    const numOrders = Math.floor(Math.random() * 25) + 2;
    console.log(`Generating ${numOrders} orders for user ${user.id}`);
    const usersShippingInfo: ShippingInfo[] = shippingInfoArray.filter((info) => (user.id === info.user_id))
    const usersBillingInfo: BillingInfo[] = billingInfoArray.filter((info) => (user.id === info.user_id))
    // for (const shippingInfo of shippingInfoArray){
    //   if (user.id === shippingInfo.user_id){
    //     usersShippingInfo.push(shippingInfo)
    //   }
    // }
    // const shippingInfo = shippingInfoArray.find(
    //   (info) => info.user_id === user.id
    // );
    // if (!shippingInfo) {
    //   console.error(`No shipping info found for user ${user.id}`);
    //   return;
    // }
    // const billingInfo = billingInfoArray.find(
    //   (info) => user.id === info.user_id
    // );
    // if (!billingInfo) {
    //   console.error(`No billing info found for user ${user.id}`);
    //   return;
    // }
    console.log("usersShippingInfo", usersShippingInfo)
    console.log("usersBillingInfo", usersBillingInfo)
    for (let i = 0; i < numOrders; i++) {
      const billingInfo = usersBillingInfo[Math.floor(Math.random() * usersBillingInfo.length)];
      const shippingInfo = usersShippingInfo[Math.floor(Math.random() * usersShippingInfo.length)];
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
