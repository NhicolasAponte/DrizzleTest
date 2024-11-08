import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";
import { faker } from "@faker-js/faker";
import { getMidpointBetweenDates, saveSeedData } from "../lib/utils";
import {
  Order,
  OrderStatus,
  UserBillingInformation,
  UserShippingInformation,
} from "../data-model/schema-definitions";
import { usersSeed } from "../seed-data/seed-users";
import { shippingInfoSeed } from "../seed-data/seed-user-shipping-info";
import { billingInfoSeed } from "../seed-data/seed-user-billing-info";

function generateRandomOrder(
  userId: string,
  billingData: UserBillingInformation,
  shippingData: UserShippingInformation
): Order {
  const id = uuidv4();
  const orderName = generate(1)[0];

  const status = generateRandomStatus();

  let dateCreated: Date | undefined = undefined;
  let dateUpdated: Date | undefined = undefined;
  let dateSubmitted: Date | undefined = undefined;
  let dateShipped: Date | undefined = undefined;
  let dateDelivered: Date | undefined = undefined;
  let midPoint: Date | undefined = undefined;

  switch (status) {
    case "DRAFT":
      // console.log("Generating draft order");
      dateCreated = faker.date.recent({ days: 75 });
      dateUpdated = faker.date.between({ from: dateCreated, to: new Date() });
      break;
    case "PENDING":
    case "QUOTE":
    case "PROCESSING":
      // console.log("Generating pending/quote/processing order");
      // date created, submitted, and updated should be recent
      dateCreated = faker.date.recent({ days: 150 });
      midPoint = getMidpointBetweenDates(
        new Date(),
        dateCreated,
        `pending/quote/processing case; STATUS: ${status}`
      );
      // console.log("midPoint", midPoint);
      dateSubmitted = faker.date.between({ from: midPoint, to: new Date() });
      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });
      break;
    case "SHIPPED":
      // console.log("Generating shipped order");
      // date created, submitted, updated, and shipped should be recent
      dateCreated = faker.date.recent({ days: 150 });
      midPoint = getMidpointBetweenDates(
        new Date(),
        dateCreated,
        `shipped case; STATUS: ${status}`
      );
      // console.log("midPoint", midPoint);
      dateSubmitted = faker.date.between({ from: midPoint, to: new Date() });
      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });
      // NOTE TODO: dateShipped should be between dateSubmitted and dateUpdated
      dateShipped = faker.date.between({
        from: dateSubmitted!,
        to: new Date(),
      });

      break;
    case "DELIVERED":
      // console.log("Generating delivered order");
      dateCreated = faker.date.recent({ days: 150 });
      midPoint = getMidpointBetweenDates(
        new Date(),
        dateCreated,
        `delivered case; STATUS: ${status}`
      );
      // console.log("midPoint", midPoint);
      dateSubmitted = faker.date.between({ from: midPoint, to: new Date() });

      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });

      dateShipped = faker.date.between({
        from: dateSubmitted!,
        to: new Date(),
      });

      dateDelivered = faker.date.between({
        from: dateShipped!,
        to: new Date(),
      });

      break;
    case "CANCELLED":
      dateCreated = faker.date.past({ years: 2 });
      dateSubmitted = faker.date.between({ from: dateCreated, to: new Date() });
      dateUpdated = faker.date.between({
        from: dateCreated,
        to: dateSubmitted,
      });
      break;
    default:
      dateCreated = faker.date.past({ years: 2 });
      break;
  }

  // if (status != "DRAFT") {
  //   dateSubmitted = faker.date.soon({ days: 65, refDate: dateCreated }); //.toLocaleString();
  //   // while (dateSubmitted < dateCreated) {
  //   //   dateSubmitted = faker.date.recent({ days: 200 })//.toLocaleString();
  //   // }
  //   dateUpdated = dateSubmitted;
  // } else {
  //   dateUpdated = faker.date.recent({ days: 200 }); //.toLocaleString();
  //   while (dateUpdated < dateCreated) {
  //     dateUpdated = faker.date.recent({ days: 100 }); //.toLocaleString();
  //   }
  // }

  // if (status === "SHIPPED" && dateSubmitted) {
  //   dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted }); //.toLocaleString();
  //   while (dateShipped < dateSubmitted) {
  //     //dateShipped = faker.date.recent({ days: 200 }).toLocaleString();
  //     dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted });
  //   }
  // }

  // if (status === "DELIVERED" && dateShipped) {
  //   dateDelivered = faker.date.soon({ days: 12, refDate: dateShipped });
  // }

  return {
    order_id: id,
    user_id: userId,
    order_name: orderName,
    shipping_data: {
      street: shippingData.street,
      apt_num: shippingData.apt_num,
      city: shippingData.city,
      state: shippingData.state,
      zip: shippingData.zip,
      is_job_site: shippingData.is_job_site,
      note: shippingData.note,
    },
    billing_data: {
      street: billingData.street,
      apt_num: billingData.apt_num,
      state: billingData.state,
      city: billingData.city,
      zip: billingData.zip,
      payment_method: billingData.payment_method,
      purchase_order: billingData.purchase_order,
      primary_contact_name: billingData.primary_contact_name,
      primary_contact_email: billingData.primary_contact_email,
      primary_contact_phone: billingData.primary_contact_phone,
      fax_num: billingData.fax_num,
      is_primary: billingData.is_primary,
      is_active: billingData.is_active,
    },
    status,
    date_created: dateCreated!,
    date_updated: dateUpdated!,
    date_submitted: dateSubmitted,
    date_shipped: dateShipped,
    date_delivered: dateDelivered,
  };
}

function generateRandomStatus() {
  const statusNum = Math.floor(Math.random() * 100);
  // NOTE: could also use enum values instead of string
  let status = OrderStatus.Draft;
  if (statusNum <= 15) {
    status = OrderStatus.Pending;
  } else if (statusNum <= 30) {
    status = OrderStatus.Draft;
  } else if (statusNum <= 45) {
    status = OrderStatus.Quote;
  } else if (statusNum <= 60) {
    status = OrderStatus.Processing;
  } else if (statusNum <= 75) {
    status = OrderStatus.Shipped;
  } else if (statusNum <= 90) {
    status = OrderStatus.Delivered;
  } else {
    status = OrderStatus.Cancelled;
  }

  return status;
}

// generate a random amount of orders for each user; anywhere between 2 and 10 orders
export function generateOrders(outputDir?: string) {
  const orders: Order[] = [];
  usersSeed.forEach((seedUser) => {
    // range for number of order: 2 - 26
    const numOrders = Math.floor(Math.random() * 25) + 2;
    console.log(`Generating ${numOrders} orders for user ${seedUser.user_id}`);
    const usersShippingInfo: UserShippingInformation[] =
      shippingInfoSeed.filter((info) => seedUser.user_id === info.user_id);
    const usersBillingInfo: UserBillingInformation[] = billingInfoSeed.filter(
      (info) => seedUser.user_id === info.user_id
    );

    for (let i = 0; i < numOrders; i++) {
      const billingInfo =
        usersBillingInfo[Math.floor(Math.random() * usersBillingInfo.length)];
      const shippingInfo =
        usersShippingInfo[Math.floor(Math.random() * usersShippingInfo.length)];
      orders.push(
        generateRandomOrder(seedUser.user_id, billingInfo, shippingInfo)
      );
    }
  });

  const dataType = "Order";
  const arrayName = "ordersSeed";
  const fileName = "seed-orders";

  saveSeedData(orders, dataType, arrayName, fileName);
}
// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(orders, null, 2), "utf-8");
// console.log(`Generated ${orders.length} orders and saved to ${jsonPath}`);

// const tsContent = `import { Order } from ${};\n\nexport const ordersArray: Order[] = ${JSON.stringify(
//   orders,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(`Generated ${orders.length} orders and saved to ${tsPath}`);
