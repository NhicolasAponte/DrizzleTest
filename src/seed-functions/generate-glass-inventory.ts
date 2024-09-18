import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export type GlassInventoryItem = {
  id: string;
  name: string;
  description: string;
  available_thickness: string[];
  shapes: string[];
  tint: string[];
  compatible_products: string[];
  quantity_available: number;
  supplier_id: string;
  quantity_incoming: quantityIncoming; // jsonb
  date_created: string;
  date_updated: string;
};

interface quantityIncoming {
  quantity_incoming: number;
  order_id: string;
  supplier_id: string;
  expected_arrival: string;
}

function generateRandomGlassInventoryItem(): GlassInventoryItem {
  return {
    id: uuidv4(),
    name: faker.commerce.productName(), // NOTE TODO: create array of possible glass names
    description: faker.commerce.productDescription(),
    available_thickness: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => `${Math.floor(Math.random() * 10) + 1}mm`
    ),
    shapes: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      faker.word.noun()
    ),
    tint: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      faker.color.human()
    ),
    compatible_products: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => uuidv4()
    ),
    quantity_available: Math.floor(Math.random() * 1000),
    supplier_id: uuidv4(),
    quantity_incoming: {
      quantity_incoming: Math.floor(Math.random() * 100),
      order_id: uuidv4(),
      supplier_id: uuidv4(),
      expected_arrival: faker.date.future().toLocaleString(),
    },
    // material on floor, whether it's in processing or stock
    // quantity_on_premise: Math.floor(Math.random() * 1000),
    // probably not needed - qty being processed for an order
    // quantity_on_order: Math.floor(Math.random() * 1000),
    // will require manual entry of re-stock orders
    // the amount of material coming in from  a supplier
    date_created: new Date().toLocaleString(),
    date_updated: new Date().toLocaleString(),
  };
}
