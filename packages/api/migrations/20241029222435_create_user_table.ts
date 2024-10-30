import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const userTableExists = await knex.schema.hasTable("user");
  if (!userTableExists) {
    return knex.schema
      .createTable("user", (table) => {
        table.increments("id").primary();
        table.text("username").notNullable().unique();
        table.text("password").notNullable();
      })
      .createTable("user_session", (table) => {
        table.text("id").notNullable().primary();
        table.integer("user_id").notNullable().references("id").inTable("user");
        table.timestamp("expires_at").notNullable();
      });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("user_session")
    .dropTableIfExists("user");
}
