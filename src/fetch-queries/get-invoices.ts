import { db } from "../drizzle/db";
import { InvoiceTable, UserProfileTable, UserTable } from "../drizzle/schema";
import { asc, desc, eq } from "drizzle-orm";

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
        lastName: UserProfileTable.last_name,
        company: UserProfileTable.company,
      })
      .from(InvoiceTable)
      .innerJoin(
        UserProfileTable,
        eq(InvoiceTable.user_id, UserProfileTable.user_id)
      )
    //   .orderBy(desc(InvoiceTable.amount), asc(InvoiceTable.date_created))
      .orderBy(asc(InvoiceTable.date_created), desc(InvoiceTable.amount) )
      .limit(100);

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
