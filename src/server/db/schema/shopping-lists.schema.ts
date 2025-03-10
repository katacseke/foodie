import { relations } from "drizzle-orm";
import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { shoppingListItems } from "./shopping-list-items.schema";

export const shoppingLists = createTable("shopping_lists", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const shoppingListsRelations = relations(shoppingLists, ({ many }) => ({
  shoppingListItems: many(shoppingListItems),
}));
