import { relations } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { inventoryItems } from "./inventory-items.schema";
import { numericCasted } from "./numeric-casted";
import { shoppingLists } from "./shopping-lists.schema";

export const shoppingListItems = createTable("shopping_list_items", {
  id: uuid().primaryKey().defaultRandom(),
  quantity: numericCasted().notNull(),
  inventoryItemId: uuid().references(() => inventoryItems.id, {
    onDelete: "cascade",
  }),
  shoppingListId: uuid().references(() => shoppingLists.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const shoppingListItemsRelations = relations(
  shoppingListItems,
  ({ one }) => ({
    shoppingList: one(shoppingLists),
    inventoryItem: one(inventoryItems),
  }),
);
