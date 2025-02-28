import { v4 as uuidv4 } from "uuid";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { faker } from "@faker-js/faker";
import { Customer } from "../data-model/schema-types";

function generateRandomCustomer(): Customer {
  const id = uuidv4();
  const phone = faker.phone.number();
  const email = faker.internet.email();
  let type = "";
  let name = "";
  const companyPrefix = [
    "Manufacturing",
    "Roofing",
    "Renovation",
    "Construction",
    "Services",
    "Logistics",
  ];
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
    const companyName = faker.person.lastName();
    name = `${companyName} 
            ${companyPrefix[Math.floor(Math.random() * companyPrefix.length)]}
            ${companySuffix[Math.floor(Math.random() * companySuffix.length)]}
            `;
    type = "company";
  }

  const account_num = Math.random().toString(36).substring(7);
  const credit_status = "good";
  const credit_limit = Math.floor(Math.random() * 16) * 1000 + 1000; // random credit limit between 1000 and 16000
  const date_updated = faker.date.past({ years: 2 });

  return {
    customer_id: id,
    name,
    phone,
    email,
    type,
    account_num,
    credit_status,
    credit_limit,
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
