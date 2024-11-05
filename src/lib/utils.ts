import * as fs from "fs";
import * as path from "path";
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

export function getSchemaName() {
  return process.env.NODE_ENV === "production"
    ? process.env.PROD_SCHEMA!
    : process.env.DEV_SCHEMA!;
}

export function getSystemTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function saveSeedDataToFiles(
  data: any,
  dataType: string,
  arrayName: string,
  jsonPath: string,
  tsPath: string,
  importLine: string
) {
  const outputDirectory = path.dirname(jsonPath);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
  // console.log(
  //   `Generated ${data.length} ${dataType} Objects and saved to ${jsonPath}`
  // );

  const tsContent = `${importLine}\nexport const ${arrayName}: ${dataType}[] = ${JSON.stringify(
    data,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(
    `Generated ${data.length} ${dataType} Objects and saved to ${tsPath}`
  );
}

export function LogData(data: {
  fileName: string;
  functionName: string;
  params: any;
}) {
  console.log("");
  console.log("------------ LOGGING DATA ------------");
  console.log(data);
  console.log("------------ END OF LOG ------------");
  console.log("");
}

export function consoleLogSpacer() {
  console.log("");
  console.log("----------------------------------------");
  console.log("");
}

export function consoleLogLoop(iterations: number, operation: () => void) {
  for (let i = 0; i < iterations; i++) {
    console.log("--------------------");
    operation();
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
  return amount.toLocaleString("en-US", {
    // NOTE: use amount / 100 if storing everything in cents
    style: "currency",
    currency: "USD",
  });
};

export const formatDateStringToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToLocal = (
  dateValue: Date,
  locale: string = "en-US"
) => {
  //const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(dateValue);
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
// function for testing logic behind determining number of orders to generate
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
};

export const TestUndefinedSchemaName = () => {
  for (let i = 0; i < 10; i++) {
    console.log("------------------------------------------------");

    const schema_name = ""; // FlipCoin() ? "test-name" : undefined;
    console.log("SCHEMA NAME: ", schema_name);

    const newSchema = pgSchema(schema_name);
    console.log(newSchema);

    if (!newSchema.schemaName) {
      console.log("newSchema name does not exist");
      throw new Error("newSchema name does not exist");
    } else {
      console.log("newSchema name exists");
    }
  }
};

export function GetDateArithmetic(date: Date, x: number) {
  const myDate = new Date(date);
  console.log("myDate:", myDate);

  const datePlusX = myDate.getDate() + x;
  console.log("myDate.getDate() + 1 =>", datePlusX);

  const newDateSet = myDate.setDate(datePlusX);
  console.log("newDateSet: myDate.setDate() => ", newDateSet);

  console.log("newDateSet - date.getTime() => ", newDateSet - date.getTime());
  console.log("new date: ", new Date(newDateSet));
}

export function OneLineDateArithmetic(date: Date, x: number) {
  const myDate = new Date(date);
  console.log("myDate:", myDate);

  const newDateSet = myDate.setDate(myDate.getDate() + x);
  console.log("newDateSet: myDate.setDate() => ", newDateSet);

  console.log("newDateSet - date.getTime() => ", newDateSet - date.getTime());
  console.log("new date: ", new Date(newDateSet));
}

export function getTimeArithmetic(date: Date, x: number) {
  const myDate = new Date(date);
  console.log("myDate:", myDate);

  const newDateSet = myDate.setTime(myDate.getTime() + x);
  console.log("newDateSet: myDate.setTime() => ", newDateSet);

  console.log("newDateSet - date.getTime() => ", newDateSet - date.getTime());
  console.log("new date: ", new Date(newDateSet));
}

export function getMidpointBetweenDates(
  newestDate: Date,
  oldestDate: Date,
  functionName: string
) {
  // console.log("----")
  // console.log("called from ->", functionName)
  const newDate = new Date(newestDate);
  const oldDate = new Date(oldestDate);
  // console.log("newest date:", newDate);
  // console.log("oldest date:", oldDate);
  // console.log("----")

  const diff = newDate.getTime() - oldDate.getTime();
  // console.log("difference in milliseconds:", diff);
  const midpoint = newDate.getTime() - diff / 2;
  // console.log("        midpoint:", midpoint);

  const midDate = new Date(midpoint);
  // console.log("        mid date:", midDate);

  // const diffReverse = oldDate.getTime() - newDate.getTime();
  // console.log("difference in milliseconds reverse:", diffReverse);
  // const midpointReverse = oldDate.getTime() - (diffReverse / 2);
  // console.log("midpoint reverse:", midpointReverse);

  // const midDateReverse = new Date(midpointReverse);
  // console.log("mid date reverse:", midDateReverse);

  return midDate;
}
// pass the dates in reverse to make sure data arithmetic is consistent
export function getMidpointBetweenDatesReverse(
  newestDate: Date,
  oldestDate: Date
) {
  console.log("----");
  console.log("reverse ");
  const newDate = new Date(newestDate);
  const oldDate = new Date(oldestDate);
  console.log("newest date:", newDate);
  console.log("oldest date:", oldDate);
  // console.log("----")

  const diff = newDate.getTime() - oldDate.getTime();
  console.log("difference in milliseconds:", diff);
  const midpoint = newDate.getTime() - diff / 2;
  console.log("        midpoint:", midpoint);

  const midDate = new Date(midpoint);
  console.log("        mid date:", midDate);

  // const diffReverse = oldDate.getTime() - newDate.getTime();
  // console.log("difference in milliseconds reverse:", diffReverse);
  // const midpointReverse = oldDate.getTime() - (diffReverse / 2);
  // console.log("midpoint reverse:", midpointReverse);

  // const midDateReverse = new Date(midpointReverse);
  // console.log("mid date reverse:", midDateReverse);

  return midDate;
}

export function dateArithmetic(dateNow: Date, fakerDate: Date, x: number) {
  // let dateCreated = faker.date.past({ years: 2 }); //.toLocaleString();
  const today = new Date(dateNow);
  let startDate = new Date(fakerDate);
  const maxShippedDate = new Date(startDate.setDate(startDate.getDate() + 205));
  // console.log("maxDate type:", typeof maxDate);
  while (maxShippedDate > today) {
    console.log("today:", today);
    console.log("startDate", startDate);
    console.log("maxShippedDate:", maxShippedDate);
    startDate = faker.date.past({ years: 2 });
  }

  let dateUpdated = undefined;
  let dateSubmitted = undefined;
  let dateShipped = undefined;
  let dateDelivered = undefined;
  let count = 0;

  for (let i = 0; i < 100; i++) {
    dateUpdated = faker.date.soon({ days: 65, refDate: startDate });
    dateSubmitted = dateUpdated;
    dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted });
    // date delivered should be date.between dateShipped and today
    dateDelivered = faker.date.soon({ days: 20, refDate: dateShipped });

    if (
      dateUpdated > dateNow ||
      dateSubmitted > dateNow ||
      dateShipped > dateNow ||
      dateDelivered > dateNow
    ) {
      console.log("--------------------------------------------");
      console.log("date is in the future");
      console.log("fakerDate:", fakerDate);
      console.log("dateUpdated:", dateUpdated);
      console.log("dateSubmitted:", dateSubmitted);
      console.log("dateShipped:", dateShipped);
      console.log("dateDelivered:", dateDelivered);
      count++;
      console.log("--------------------------------------------");
    }
  }
  console.log("dates in future:", count);
}

// const dateNow = new Date();
// console.log("dateNow:", dateNow);
// console.log("dateNow type:", typeof dateNow);
// console.log("dateNow.getTime() =>", dateNow.getTime());
// // console.log("date timezone", dateNow.getTimezoneOffset());
// // console.log("dateNow as num", dateNow as Number)
// console.log("----");

// let copyDate = dateCreated;
// // let dateCreated = faker.date.past({ years: 2 }); //.toLocaleString();
// // console.log("value of", dateCreated.valueOf());
// console.log("dateCreated:", dateCreated);
// console.log("   copyDate:", copyDate);
// // console.log("dateCreated type:", typeof dateCreated);
// console.log("----");

// console.log("dateCreate.getDate() =>", dateCreated.getDate());
// console.log("dateCreated.getTime() =>", dateCreated.getTime());
// console.log("----");

// const x= 1;
// console.log("x:", x);
// console.log("----");

// // const datePlusX = dateCreated.getDate() + x
// // console.log(datePlusX);
// // const tempDate = dateCreated.setDate(datePlusX);
// // console.log("tempDate:", tempDate);
// // const tempDateAsDate = new Date(tempDate);
// // console.log("tempDateAsDate:", tempDateAsDate);

// // console.log("----");

// // let dateCreatedPlusX = dateCreated.setDate(dateCreated.getDate() + x);
// // console.log("dateCreatedPlusX: getDate() =>:", dateCreatedPlusX);

// // let dateCreatedPlusXAsDate = new Date(dateCreatedPlusX);
// // console.log("dateCreatedPlusXAsDate:", dateCreatedPlusXAsDate);

// console.log("----");

// console.log(copyDate.getTime() + x);
// let datePlusXSetTIme = copyDate.setTime(copyDate.getTime() + x);

// console.log("datePlusXSetTIme: getTime() =>:", datePlusXSetTIme);
// let datePlusXSetTImeAsDate = new Date(datePlusXSetTIme);
// console.log("datePlusXSetTImeAsDate:", datePlusXSetTImeAsDate);

// console.log("----");
// // console.log("get date method difference: ", dateCreatedPlusXAsDate.getTime() - dateCreated.getTime());
// console.log("get time method difference: ", datePlusXSetTImeAsDate.getTime() - dateCreated.getTime());
// console.log("")
// console.log("----");
// console.log(getSystemTimeZone());
// console.log(dateCreated.getTimezoneOffset());
// const dateNow = new Date();
// console.log(dateNow.getTimezoneOffset());
// console.log("dateCreatedPlusXAsDate type:", typeof dateCreatedPlusXAsDate);

// couldn't get this to work
export async function userInputMethod() {
  process.stdin.on("readable", () => {
    let chunk;

    while ((chunk = process.stdin.read()) !== null) {
      process.stdout.write("input: ", chunk);
    }
  });
}
