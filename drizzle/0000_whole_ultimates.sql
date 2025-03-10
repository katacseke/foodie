CREATE TABLE "foodie_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"is_ingredient" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_inventory_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"icon" varchar,
	"category_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_recipe_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quantity" numeric(65, 30) NOT NULL,
	"unit_id" uuid,
	"inventory_item_id" uuid,
	"recipe_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"serving_size" integer,
	"prep_time" integer,
	"cooking_time" integer,
	"tags" varchar[] DEFAULT '{}' NOT NULL,
	"comments" varchar[] DEFAULT '{}' NOT NULL,
	"image" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_shopping_list_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quantity" numeric(65, 30) NOT NULL,
	"inventory_item_id" uuid,
	"shopping_list_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_shopping_lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "foodie_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"abbreviation" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "foodie_inventory_items" ADD CONSTRAINT "foodie_inventory_items_category_id_foodie_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."foodie_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodie_recipe_items" ADD CONSTRAINT "foodie_recipe_items_unit_id_foodie_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."foodie_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodie_recipe_items" ADD CONSTRAINT "foodie_recipe_items_inventory_item_id_foodie_inventory_items_id_fk" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."foodie_inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodie_recipe_items" ADD CONSTRAINT "foodie_recipe_items_recipe_id_foodie_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."foodie_recipes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodie_shopping_list_items" ADD CONSTRAINT "foodie_shopping_list_items_inventory_item_id_foodie_inventory_items_id_fk" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."foodie_inventory_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodie_shopping_list_items" ADD CONSTRAINT "foodie_shopping_list_items_shopping_list_id_foodie_shopping_lists_id_fk" FOREIGN KEY ("shopping_list_id") REFERENCES "public"."foodie_shopping_lists"("id") ON DELETE cascade ON UPDATE no action;