import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const linksTableExists = await knex.schema.hasTable("link");
  if (linksTableExists) {
    await knex.schema.alterTable("link", (table) => {
      table
        .dateTime("expires_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP + INTERVAL '1 hour'"));
    });
  }

  const filesTableExists = await knex.schema.hasTable("file");
  if (filesTableExists) {
    await knex.schema.alterTable("file", (table) => {
      table.text("path");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const linksTableExists = await knex.schema.hasTable("link");
  if (linksTableExists) {
    await knex.schema.alterTable("link", (table) => {
      table.dropColumn("expires_at");
    });
  }

  const filesTableExists = await knex.schema.hasTable("file");
  if (filesTableExists) {
    await knex.schema.alterTable("file", (table) => {
      table.dropColumn("path");
    });
  }
}
