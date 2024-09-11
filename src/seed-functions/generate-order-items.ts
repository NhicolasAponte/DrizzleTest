import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";
import { ordersArray } from "../seed-data/orders";

export type OrderItem = {
    id: number;
    orderId: string;
    product: any;
    note: string;
    quantity: number;
}

function generateRandomOrderItem(orderId: string){
    return {
        id: Math.floor(Math.random() * 1000),
        orderId,
        product: {
            name: generate(1)[0],
            price: Math.floor(Math.random() * 10000),
            description: "some description",
        },
        note: "some note",
        quantity: Math.floor(Math.random() * 211),
    };
}

export function generateOrderItems(){
    const orderItemsData: OrderItem[] = [];
    for (let order of ordersArray){
        const numItems = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < numItems; i++){
            orderItemsData.push(generateRandomOrderItem(order.id));
        }
    }
}