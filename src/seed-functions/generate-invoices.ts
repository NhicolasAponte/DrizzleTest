import { faker } from "@faker-js/faker";
import { ordersArray } from "../seed-data/orders";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

export type Invoice = {
  id: string;
  user_id: string;
  order_id: string;
  date_created: string;
  status: string;
  amount: number;
};

function generateRandomInvoice(
  userId: string,
  orderId: string,
  dateSubmitted: string
): Invoice {
  const id = uuidv4();
  const statusRand = Math.floor(Math.random() * 2) + 1;
  const status = statusRand % 2 === 0 ? "PENDING" : "PAID";
  const amount = Math.random() * 1000; // NOTE TODO: round to two decimal places
  const dateCreated = faker.date
    .between({ from: dateSubmitted, to: new Date() })
    .toLocaleString();
  return {
    id,
    user_id: userId,
    order_id: orderId,
    date_created: dateCreated,
    status,
    amount,
  };
}

export function generateInvoices() {
  const invoices: Invoice[] = [];

  for (let order of ordersArray) {
    if (order.date_submitted) {
      invoices.push(
        generateRandomInvoice(order.user_id, order.id, order.date_submitted)
      );
    }
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}invoices.json`;
  const tsPath = `${dir}invoices.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(invoices, null, 2), "utf-8");
  console.log(`Generated ${invoices.length} invoices and saved to ${jsonPath}`);

  const tsContent = `import { Invoice } from "../seed-functions/generate-invoices";\n\nexport const invoicesArray: Invoice[] = ${JSON.stringify(
    invoices,
    null,
    2
  )};\n`;

  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${invoices.length} invoices and save to ${tsPath}`);
}
