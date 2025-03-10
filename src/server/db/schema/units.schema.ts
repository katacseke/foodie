import { relations } from "drizzle-orm";
import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { recipeItems } from "./recipe-items.schema";

export const units = createTable("units", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  abbreviation: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const unitsRelations = relations(units, ({ many }) => ({
  recipeItems: many(recipeItems),
}));
