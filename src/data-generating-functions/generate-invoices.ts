import { faker } from "@faker-js/faker";
import { ordersArray } from "../seed-data/orders";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { Invoice } from "./type-definitions";

function generateRandomInvoice(
  userId: string,
  orderId: string,
  dateSubmitted: Date
): Invoice {
  const id = uuidv4();
  const statusRand = Math.floor(Math.random() * 2) + 1;
  const status = statusRand % 2 === 0 ? "PENDING" : "PAID";
  const amountRandomizer = Math.floor(Math.random() * 2) + 1;
  const amount =
    amountRandomizer % 2 === 0
      ? parseFloat((Math.random() * 1000 + 120).toFixed(2))
      : parseFloat((Math.random() * 1000000 + 5000).toFixed(2));
  const dateCreated = faker.date.between({
    from: dateSubmitted,
    to: new Date(),
  });
  //.toLocaleString();
  return {
    id,
    user_id: userId,
    order_id: orderId,
    date_created: dateCreated,
    //date_created_tz: dateCreated,
    status,
    amount,
  };
}

export function generateInvoices(outputDir?: string) {
  const invoices: Invoice[] = [];

  for (let order of ordersArray) {
    if (order.date_submitted) {
      invoices.push(
        generateRandomInvoice(order.user_id, order.id, order.date_submitted)
      );
    }
  }

  const dir = outputDir ? outputDir : "./src/seed-data";
  const jsonPath = `${dir}/invoices.json`;
  const tsPath = `${dir}/invoices.ts`;

  const outputDirectory = path.dirname(jsonPath);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(invoices, null, 2), "utf-8");
  console.log(`Generated ${invoices.length} invoices and saved to ${jsonPath}`);

  const tsContent = `import { Invoice } from "../data-generating-functions/type-definitions";\n\nexport const invoicesArray: Invoice[] = ${JSON.stringify(
    invoices,
    null,
    2
  )};\n`;

  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${invoices.length} invoices and save to ${tsPath}`);
}
