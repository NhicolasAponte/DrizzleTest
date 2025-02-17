import { v4 as uuidv4 } from "uuid";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { faker } from "@faker-js/faker";

function generateRandomCustomer() {
  const id = uuidv4();
  const phone = faker.phone.number();
  const email = faker.internet.email();
  let type = "";
  let name = "";
  const companySuffix = [
    "Supply",
    "Corporation",
    "LLC",
    "Inc",
    "Company",
    "Solutions",
  ];
  if (Math.random() > 0.6) {
    name = faker.person.fullName();
    type = "individual";
  } else {
    const companyPrefix = FlipCoin()
      ? faker.word.noun()
      : faker.person.lastName();
    name = `${companyPrefix} ${
      companySuffix[Math.floor(Math.random() * companySuffix.length)]
    }`;
    type = "company";
  }

  const account_num = Math.random().toString(36).substring(7);
  const credit_status = "good";
  const credit_limit = Math.floor(Math.random() * 10000);
  const date_created = faker.date.past({ years: 2 });
  const date_updated = faker.date.recent();

  return {
    customer_id: id,
    name,
    phone,
    email,
    type,
    account_num,
    credit_status,
    credit_limit,
    date_created,
    date_updated,
  };
}

export function generateCustomers(numCustomers: number) {
  const customers = [];

  for (let i = 0; i < numCustomers; i++) {
    customers.push(generateRandomCustomer());
  }

  const dataType = "Customer";
  const arrayName = "customersSeed";
  const fileName = "customers";

  saveSeedData(customers, dataType, arrayName, fileName);
}
