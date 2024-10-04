import { db } from "../drizzle/db";
import { InvoiceTable, UserProfileTable, UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function GetInvoiceByAmountWithUser() {
  console.log("fetching invoices by amount with user");

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
      })
      .from(InvoiceTable)
      .innerJoin(
        UserProfileTable,
        eq(InvoiceTable.user_id, UserProfileTable.id)
      )
      .orderBy(InvoiceTable.amount);

    console.log(invoices);
    return invoices;
  } catch (error) {
    console.error(error);
  }
}

// Update the services object to include the new function
export const services = {
  GetInvoiceByAmount: {
    WithUser: GetInvoiceByAmountWithUser,
  },
};
