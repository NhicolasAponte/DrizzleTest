import { v4 as uuidv4 } from "uuid";
import { FlipCoin, saveSeedData } from "../lib/utils";
import { faker } from "@faker-js/faker";

function generateRandomCustomer() {
    const id = uuidv4();
    const coin = FlipCoin();
    const phone = faker.phone.number();
    const email = faker.internet.email(); 
    let type = "";
    let name = "";
    if ( coin ) {
        name = faker.person.fullName()
        type = "individual";
    }
    else {
        name = faker.company.name();
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
        date_updated
    };
}

export function generateCustomers(numCustomers: number) {
    const customers =[]; 

    for (let i = 0; i < numCustomers; i++) {
        customers.push(generateRandomCustomer());
    }

    const dataType = "Customer";
    const arrayName = "customersSeed";
    const fileName = "customers"; 

    saveSeedData(customers, dataType, arrayName, fileName);
}