import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable('users', {
  userId: varchar("user_id").primaryKey(),
  roleId: integer("role_id").notNull().default(2),
  fullname: varchar("fullname").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  oauth: varchar("oauth").notNull().default("local"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
  lastLogin: timestamp("last_login"),
});