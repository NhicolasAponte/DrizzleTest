import { User, UserRole } from "../../data-model/schema-definitions";

export const usersSeed: User[] = [
  {
    id: "e39ab582-5291-43c4-820e-245b05a9d771",
    email: "throw.read@example.com",
    password: "ivq1bgl",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "4179bb77-106a-444a-b5b2-28a1328d1b41",
    email: "motion.mighty@example.com",
    password: "nwiqza",
    role: UserRole.User,
    is_active: true
  },
  {
    id: "74e7aa38-1430-4f1e-a60f-6c59bc8881e1",
    email: "old.point@example.com",
    password: "2fq4n",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "2dae14aa-f41c-4043-bf5c-a76da07873ae",
    email: "modern.bet@example.com",
    password: "0ac6ob",
    role: UserRole.Admin,
    is_active: true
  },
  {
    id: "9d9299fe-8c2c-4d7d-bcb8-c688695d4670",
    email: "substance.organized@example.com",
    password: "cl9dmk",
    role: UserRole.Admin,
    is_active: true
  }
];
