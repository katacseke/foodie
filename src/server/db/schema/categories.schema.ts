import { boolean, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { relations } from "drizzle-orm";
import { inventoryItems } from "./inventory-items.schema";

export const categories = createTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  isIngredient: boolean().default(true),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  inventoryItems: many(inventoryItems),
}));
