import { da } from "@faker-js/faker";
import { db } from "../drizzle/db";
import {
  OrderInvoiceTable,
  UserProfileTable,
  UserTable,
} from "../drizzle/schema";
import { and, asc, desc, eq, gt, lt, sql } from "drizzle-orm";

export async function GetInvoiceByAmountWithUser() {
  console.log("fetching invoices by amount with user");
  const lessThanDate: Date = new Date("2024-06-03T20:25:30.000Z");
  const greaterDate: Date = new Date("2024-04-30T20:25:30.000Z");
  try {
    const invoices = await db
      .select({
        invoiceId: OrderInvoiceTable.order_invoice_id,
        userId: OrderInvoiceTable.user_id,
        orderId: OrderInvoiceTable.order_id,
        dateUpdated: OrderInvoiceTable.date_updated,
        invoiceDate: OrderInvoiceTable.invoice_date,
        status: OrderInvoiceTable.status,
        amount: OrderInvoiceTable.amount,
        userName: UserProfileTable.first_name,
        lastName: UserProfileTable.last_name,
      })
      .from(OrderInvoiceTable)
      .innerJoin(
        UserProfileTable,
        eq(OrderInvoiceTable.user_id, UserProfileTable.user_id)
      )
      .where(
        and(
          lt(OrderInvoiceTable.invoice_date, lessThanDate),
          gt(OrderInvoiceTable.invoice_date, greaterDate)
        )
      )
      // .orderBy(desc(OrderInvoiceTable.amount), asc(OrderInvoiceTable.date_created))
      .orderBy(
        asc(sql`DATE_TRUNC('month', ${OrderInvoiceTable.invoice_date})`),
        desc(OrderInvoiceTable.amount)
      )
      .limit(15);

    console.log(invoices);
    return invoices;
  } catch (error) {
    console.error(error);
  }
}

// Update the services object to include the new function
// export const services = {
//   GetInvoiceByAmount: {
//     WithUser: GetInvoiceByAmountWithUser,
//   },
// };
