import { da } from "@faker-js/faker";
import { db } from "../drizzle/db";
import { InvoiceTable, UserProfileTable, UserTable } from "../drizzle/schema";
import { and, asc, desc, eq, gt, lt, sql } from "drizzle-orm";

export async function GetInvoiceByAmountWithUser() {
  console.log("fetching invoices by amount with user");
  const lessThanDate: Date = new Date("2024-06-03T20:25:30.000Z");
  const greaterDate: Date = new Date("2024-04-30T20:25:30.000Z");
  try {
    const invoices = await db
      .select({
        invoiceId: InvoiceTable.id,
        userId: InvoiceTable.user_id,
        orderId: InvoiceTable.order_id,
        dateCreated: InvoiceTable.date_created,
        status: InvoiceTable.status,
        amount: InvoiceTable.amount,
        userName: UserProfileTable.first_name,
        lastName: UserProfileTable.last_name,
        company: UserProfileTable.company,
      })
      .from(InvoiceTable)
      .innerJoin(
        UserProfileTable,
        eq(InvoiceTable.user_id, UserProfileTable.user_id)
      )
      .where(
        and(
          lt(InvoiceTable.date_created, lessThanDate),
          gt(InvoiceTable.date_created, greaterDate)
        )
      )
      // .orderBy(desc(InvoiceTable.amount), asc(InvoiceTable.date_created))
      .orderBy(
        asc(sql`DATE_TRUNC('month', ${InvoiceTable.date_created})`),
        desc(InvoiceTable.amount)
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
