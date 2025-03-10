import { relations } from "drizzle-orm";
import { integer, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../create-table";
import { recipeItems } from "./recipe-items.schema";

export const recipes = createTable("recipes", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar().notNull(),
  description: varchar(),
  servingSize: integer(),
  prepTime: integer(),
  cookingTime: integer(),
  tags: varchar().array().notNull().default([]),
  comments: varchar().array().notNull().default([]),
  image: varchar(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeItems: many(recipeItems),
}));
