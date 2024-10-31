import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  const usersTableExists = await knex.schema.hasTable("users");
  if (!usersTableExists) {
    await knex.schema.createTable("user", (table) => {
      table
        .uuid("id")
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
      table.string("username", 255).notNullable().unique();
      table.string("password", 255).notNullable();
    });
  }

  const filesTableExists = await knex.schema.hasTable("files");
  if (!filesTableExists) {
    await knex.schema.createTable("file", (table) => {
      table
        .uuid("id")
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
      table
        .uuid("user_id")
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table.text("name").notNullable();
    });
  }

  // Check if the links table exists
  const linksTableExists = await knex.schema.hasTable("links");
  if (!linksTableExists) {
    await knex.schema.createTable("link", (table) => {
      table
        .uuid("id")
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
      table
        .date("creation_date")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP + INTERVAL '1 hour'"));
      table
        .uuid("file_id")
        .notNullable()
        .references("id")
        .inTable("file")
        .onDelete("CASCADE");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  // Drop the links, files, and users tables in reverse order of creation
  await knex.schema
    .dropTableIfExists("link")
    .dropTableIfExists("file")
    .dropTableIfExists("user");
}
