import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";

export async function DropSchema(schema_name: string) {
    
    await db.execute(sql`DROP SCHEMA IF EXISTS ${schema_name} CASCADE`);
}

// query to get schema from different db types 
export async function getAllSchema(){
    const result = await db.execute(sql`SELECT schema_name FROM information_schema.schemata`);
    console.log(result);
    //return result;
}

// PostgreSQL-specific query 
export async function getPGSchema(){
    const result = await db.execute(sql`SELECT nspname FROM pg_catalog.pg_namespace`);
    console.log(result);
}

// sql query to get all schema 
// SELECT nspname
// FROM pg_catalog.pg_namespace;

// function for testing date functions 
export function compareDateToStringFunctions() {
    // toDateString(): Human-readable date portion only.
    const dateString = new Date().toDateString();
    console.log(dateString,"                                                  : dateString");
    // toISOString(): ISO 8601 format, standardized.
    const isoString = new Date().toISOString();
    console.log(isoString, "                                         : isoDate");
    // toJSON(): Same as toISOString(), useful for JSON serialization.
    const jsonDate = new Date().toJSON();
    console.log(jsonDate, "                                         : jsonDate");
    // toLocaleDateString(): Localized date portion.
    const localeDateString = new Date().toLocaleDateString();
    console.log(localeDateString, "                                                        : localeDateString");
    // toLocaleString(): Localized date and time.
    const localeString = new Date().toLocaleString();
    console.log(localeString, "                                            : localeString");
    // toLocaleTimeString(): Localized time portion.
    const localeTimeString = new Date().toLocaleTimeString();
    console.log(localeTimeString, "                                                       : localeTimeString");
    // toString(): Human-readable date and time.
    const dateToString = new Date().toString();
    console.log(dateToString, "        : dateToString");
    // toTimeString(): Human-readable time portion.
    const dateToTimeString = new Date().toTimeString();
    console.log(dateToTimeString, "                        : dateToTimeString");
    // toUTCString(): Date and time in UTC.
    const dateToUTCString = new Date().toUTCString();
    console.log(dateToUTCString, "                                    : dateToUTCString");
  }
// function for testing logic behind determining number of orders to gnerate 
export function numOrders() {
    let max = 0;
    let min = 10;
  
    for (let i = 0; i < 100; i++) {
      // const rand = Math.random()
      // console.log("rand:", rand);
  
      // const rand9 = rand * 9;
      // console.log("rand9:", rand9);
  
      // const floor = Math.floor(rand9);
      // console.log("floor:", floor);
  
      // const floor2 = floor + 2;
      // console.log("floor2:", floor2);
  
      const numOrders = Math.floor(Math.random() * 9) + 2;
      // console.log(numOrders);
  
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