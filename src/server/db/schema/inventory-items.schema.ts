import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { categories } from "./categories.schema";
import { relations } from "drizzle-orm";
import { shoppingLists } from "./shopping-lists.schema";

export const inventoryItems = createTable("inventory_items", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  description: varchar(),
  icon: varchar(),
  categoryId: uuid().references(() => categories.id, { onDelete: "set null" }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const inventoryItemsRelations = relations(
  inventoryItems,
  ({ one, many }) => ({
    category: one(categories),
    shoppingLists: many(shoppingLists),
  }),
);
