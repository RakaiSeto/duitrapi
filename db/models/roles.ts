import { pgTable, integer, varchar } from "drizzle-orm/pg-core"

export const rolesTable = pgTable('roles', {
  roleId: integer("role_id").primaryKey(),
  roleName: varchar("role_name").notNull(),
});