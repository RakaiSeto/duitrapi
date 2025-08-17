import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core"

export const categoriesTable = pgTable('categories', {
  categoryId: varchar("category_id").primaryKey(),
  userId: varchar("user_id").notNull(),
  categoryName: varchar("category_name").notNull(),
  colorHex: varchar("color_hex").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});