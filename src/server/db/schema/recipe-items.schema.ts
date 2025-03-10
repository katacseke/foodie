import { relations } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { inventoryItems } from "./inventory-items.schema";
import { numericCasted } from "./numeric-casted";
import { recipes } from "./recipes.schema";
import { units } from "./units.schema";

export const recipeItems = createTable("recipe_items", {
  id: uuid().primaryKey().defaultRandom(),
  quantity: numericCasted().notNull(),
  unitId: uuid().references(() => units.id),
  inventoryItemId: uuid().references(() => inventoryItems.id),
  recipeId: uuid().references(() => recipes.id, { onDelete: "cascade" }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const recipeItemsRelations = relations(recipeItems, ({ one }) => ({
  recipe: one(recipes),
  inventoryItem: one(inventoryItems),
  unit: one(units),
}));
