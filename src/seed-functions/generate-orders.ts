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
import { getMidpointBetweenDates } from "../lib/utils";

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

  const status = generateRandomStatus();

  let dateCreated: Date | undefined = undefined;
  let dateUpdated: Date | undefined = undefined;
  let dateSubmitted: Date | undefined = undefined;
  let dateShipped: Date | undefined = undefined;
  let dateDelivered: Date | undefined = undefined;

  switch (status) {
    case "DRAFT":
      dateCreated = faker.date.recent({ days: 75 });
      dateUpdated = faker.date.between({ from: dateCreated, to: new Date() });
      break;
    case "PENDING":
    case "QUOTE":
    case "PROCESSING":
      // date created, submitted, and updated should be recent
      dateCreated = faker.date.recent({ days: 150 });
      const midPoint = getMidpointBetweenDates(new Date(), dateCreated);
      dateSubmitted = faker.date.between({ from: midPoint, to: new Date() });
      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });
      break;
    case "SHIPPED":
      // date created, submitted, updated, and shipped should be recent
      dateCreated = faker.date.recent({ days: 150 });
      const midPoint = getMidpointBetweenDates(new Date(), dateCreated);
      dateSubmitted = faker.date.between({ from: midPoint, to: new Date() });
      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });
      break;
    case "DELIVERED":
      // date created, submitted, updated, shipped, and delivered should be recent
      break;
    case "CANCELLED":
      break;
    default:
      break;
  }

  if (status != "DRAFT") {
    dateSubmitted = faker.date.soon({ days: 65, refDate: dateCreated }); //.toLocaleString();
    // while (dateSubmitted < dateCreated) {
    //   dateSubmitted = faker.date.recent({ days: 200 })//.toLocaleString();
    // }
    dateUpdated = dateSubmitted;
  } else {
    dateUpdated = faker.date.recent({ days: 200 }); //.toLocaleString();
    while (dateUpdated < dateCreated) {
      dateUpdated = faker.date.recent({ days: 100 }); //.toLocaleString();
    }
  }

  if (status === "SHIPPED" && dateSubmitted) {
    dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted }); //.toLocaleString();
    while (dateShipped < dateSubmitted) {
      //dateShipped = faker.date.recent({ days: 200 }).toLocaleString();
      dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted });
    }
  }

  if (status === "DELIVERED" && dateShipped) {
    dateDelivered = faker.date.soon({ days: 12, refDate: dateShipped });
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
    date_delivered: dateDelivered,
  };
}

function generateRandomStatus() {
  const statusNum = Math.floor(Math.random() * 100);
  // NOTE: could also use enum values instead of string
  let status = "DRAFT";
  if (statusNum <= 15) {
    status = "PENDING";
  } else if (statusNum <= 30) {
    status = "DRAFT";
  } else if (statusNum <= 45) {
    status = "QUOTE";
  } else if (statusNum <= 60) {
    status = "PROCESSING";
  } else if (statusNum <= 75) {
    status = "SHIPPED";
  } else if (statusNum <= 90) {
    status = "DELIVERED";
  } else {
    status = "CANCELLED";
  }

  return status;
}

// generate a random amount of orders for each user; anywhere between 2 and 10 orders
export function generateOrders() {
  const orders: Order[] = [];
  users.forEach((user) => {
    // range for number of order: 2 - 26
    const numOrders = Math.floor(Math.random() * 25) + 2;
    console.log(`Generating ${numOrders} orders for user ${user.id}`);
    const usersShippingInfo: ShippingInfo[] = shippingInfoArray.filter(
      (info) => user.id === info.user_id
    );
    const usersBillingInfo: BillingInfo[] = billingInfoArray.filter(
      (info) => user.id === info.user_id
    );
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
    console.log("usersShippingInfo", usersShippingInfo);
    console.log("usersBillingInfo", usersBillingInfo);
    for (let i = 0; i < numOrders; i++) {
      const billingInfo =
        usersBillingInfo[Math.floor(Math.random() * usersBillingInfo.length)];
      const shippingInfo =
        usersShippingInfo[Math.floor(Math.random() * usersShippingInfo.length)];
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
