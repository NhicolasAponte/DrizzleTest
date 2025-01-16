import { User, UserRole } from "../../data-model/schema-definitions";

export const usersSeed: User[] = [
  {
    id: "8ac6a6b7-2608-4326-832b-de8deb22a50b",
    email: "avoid.hung@example.com",
    password: "ptnub5",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "5210678d-94d8-4b79-b481-e717ce4d035e",
    email: "becoming.proud@example.com",
    password: "r9zg4k",
    role: UserRole.User,
    is_active: true
  },
  {
    id: "f58399ca-16db-4830-86cd-b7fdfc83998a",
    email: "first.third@example.com",
    password: "gortor",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "731fddcd-7f89-48ba-98af-c36219d03c0b",
    email: "simply.special@example.com",
    password: "5u5myn",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "e640e304-e19f-4259-8d39-912a6fcbb9bd",
    email: "with.tightly@example.com",
    password: "qg5nsae",
    role: UserRole.User,
    is_active: true
  }
];
