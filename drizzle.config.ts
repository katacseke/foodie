import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema/index.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
  tablesFilter: ["foodie_*"],
});
