import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("file", (table) => {
    table.float("size").notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("file", (table) => {
    table.dropColumn("size");
  });
}
