import { pgTable, varchar, timestamp, real } from "drizzle-orm/pg-core"

export const walletsTable = pgTable('wallets', {
  walletId: varchar("wallet_id").primaryKey(),
  userId: varchar("user_id").notNull(),
  walletName: varchar("wallet_name").notNull(),
  walletBalance: real("wallet_balance").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type Wallets = typeof walletsTable.$inferSelect;