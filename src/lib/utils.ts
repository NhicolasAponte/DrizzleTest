import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { pgSchema } from "drizzle-orm/pg-core";
import { faker } from "@faker-js/faker";

export async function DropSchema(schema_name: string) {
  await db.execute(sql`DROP SCHEMA IF EXISTS "${schema_name}" CASCADE`);
}

// query to get schema from different db types
export async function getAllSchema() {
  const result = await db.execute(
    sql`SELECT schema_name FROM information_schema.schemata`
  );
  console.log(result);
  //return result;
}

// PostgreSQL-specific query
export async function getPGSchema() {
  const result = await db.execute(
    sql`SELECT nspname FROM pg_catalog.pg_namespace`
  );
  console.log(result);
}

// sql query to get all schema
// SELECT nspname
// FROM pg_catalog.pg_namespace;

export function SchemaName(){
  return process.env.NODE_ENV === "production"
    ? process.env.PROD_SCHEMA!
    : process.env.DEV_SCHEMA!;
};

export function consoleLogLoop() {
  for (let i = 0; i < 100; i++) {
    console.log("--------------------");

    // let num = Math.random() * 1000;
    // // num = num > 99 ? num : num + 100;
    // console.log("num:", num);

    // const amount = parseFloat(num.toFixed(2));
    // console.log("amount:", amount);
    // console.log("type", typeof amount);
    // console.log("amount in dollars:", dollarStringFormat(amount));
    

  }
  // console.log("13589.6:", dollarStringFormat(13589.6));
  // console.log("13589.6:", formatCurrency(13589.6));
  console.log("-------------------- LOOP END --------------------");
}

export function dollarStringFormat(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export const formatCurrency = (amount: number) => {
  return (amount).toLocaleString("en-US", { // NOTE: use amount / 100 if storing everything in cents
    style: "currency",
    currency: "USD",
  });
};

// function for testing date functions
export function compareDateToStringFunctions() {
  // toDateString(): Human-readable date portion only.
  const dateString = new Date().toDateString();
  console.log(
    dateString,
    "                                                  : dateString"
  );
  // toISOString(): ISO 8601 format, standardized.
  const isoString = new Date().toISOString();
  console.log(isoString, "                                         : isoDate");
  // toJSON(): Same as toISOString(), useful for JSON serialization.
  const jsonDate = new Date().toJSON();
  console.log(jsonDate, "                                         : jsonDate");
  // toLocaleDateString(): Localized date portion.
  const localeDateString = new Date().toLocaleDateString();
  console.log(
    localeDateString,
    "                                                        : localeDateString"
  );
  // toLocaleString(): Localized date and time.
  const localeString = new Date().toLocaleString();
  console.log(
    localeString,
    "                                            : localeString"
  );
  // toLocaleTimeString(): Localized time portion.
  const localeTimeString = new Date().toLocaleTimeString();
  console.log(
    localeTimeString,
    "                                                       : localeTimeString"
  );
  // toString(): Human-readable date and time.
  const dateToString = new Date().toString();
  console.log(dateToString, "        : dateToString");
  // toTimeString(): Human-readable time portion.
  const dateToTimeString = new Date().toTimeString();
  console.log(dateToTimeString, "                        : dateToTimeString");
  // toUTCString(): Date and time in UTC.
  const dateToUTCString = new Date().toUTCString();
  console.log(
    dateToUTCString,
    "                                    : dateToUTCString"
  );
}
// function for testing logic behind determining number of orders to gnerate
export function numOrders() {
  let max = 0;
  let min = 100;

  for (let i = 0; i < 1000; i++) {
    // const rand = Math.random()
    // console.log("rand:", rand);

    // const rand9 = rand * 9;
    // console.log("rand9:", rand9);

    // const floor = Math.floor(rand9);
    // console.log("floor:", floor);

    // const floor2 = floor + 2;
    // console.log("floor2:", floor2);

    const numOrders = Math.floor(Math.random() * 25) + 2;
    console.log(numOrders);

    if (numOrders > max) {
      max = numOrders;
    }

    if (numOrders < min) {
      min = numOrders;
    }

    console.log("----");
  }

  console.log("max:", max);
  console.log("min:", min);

  return numOrders;
}

export const FlipCoin = () => {
  return Math.random() > 0.5;
}

export const TestUndefinedSchemaName = () => {
  for (let i = 0; i < 10; i++){
    console.log("------------------------------------------------");
    
    const schema_name = "" // FlipCoin() ? "test-name" : undefined;
    console.log("SCHEMA NAME: ", schema_name);
    
    const newSchema = pgSchema(schema_name); 
    console.log(newSchema);
    
    if(!newSchema.schemaName){
      console.log("newSchema name does not exist");
      throw new Error("newSchema name does not exist");
    }
    else {
      console.log("newSchema name exists");
    }
  }
}
