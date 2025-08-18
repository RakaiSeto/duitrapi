import { pgTable, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"

export const transactionsTable = pgTable('transactions', {
  transactionId: varchar("transaction_id").primaryKey(),
  userId: varchar("user_id").notNull(),
  categoryId: varchar("category_id").notNull(),
  startWallet: varchar("start_wallet"),
  endWallet: varchar("end_wallet"),
  transactionDate: timestamp("transaction_date").notNull(),
  description: varchar("description").notNull().default(""),
  iO: boolean("i/o").notNull().default(true),
  total: integer("total").notNull(),
  photoLink: varchar("photo_link").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});