import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { OrderInvoice } from "../data-model/schema-definitions";
import { saveSeedData } from "../lib/utils";

function generateRandomInvoice(
  userId: string,
  orderId: string,
  customer_id: string,
  amount: number,
  dateSubmitted: Date
): OrderInvoice {
  const id = uuidv4();

  const invoiceNumber = "INV" + Math.floor(Math.random() * 1000000);

  const statusRand = Math.floor(Math.random() * 2) + 1;
  const status = statusRand % 2 === 0 ? "PENDING" : "PAID";
  
  const dateCreated = faker.date.between({
    from: dateSubmitted,
    to: new Date(),
  });
  //.toLocaleString();
  return {
    order_invoice_id: id,
    created_by: userId,
    order_id: orderId,
    customer_id: customer_id,
    invoice_number: invoiceNumber,
    status,
    amount,
    date_created: dateCreated,
  };
}

export function generateInvoices(outputDir?: string) {
  const invoices: OrderInvoice[] = [];

  for (let order of ordersSeed) {
    if (order.date_submitted) {
      invoices.push(
        generateRandomInvoice(
          order.created_by ? order.created_by : "1",
          order.order_id,
          order.customer_id,
          order.amount,
          order.date_submitted
        )
      );
    }
  }

  const dataType = "OrderInvoice";
  const arrayName = "orderInvoiceSeed";
  const fileName = "order-invoices";

  saveSeedData(invoices, dataType, arrayName, fileName);
}
// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(invoices, null, 2), "utf-8");
// console.log(`Generated ${invoices.length} invoices and saved to ${jsonPath}`);

// const tsContent = `import { Invoice } from ${};\n\nexport const invoicesArray: Invoice[] = ${JSON.stringify(
//   invoices,
//   null,
//   2
// )};\n`;

// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(`Generated ${invoices.length} invoices and save to ${tsPath}`);
