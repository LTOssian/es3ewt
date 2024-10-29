import knex from "knex";

export const pg = knex({
  client: "pg",
  connection: process.env.CONNECTION_STRING,
  migrations: {
    directory: "../../../../migrations",
  },
});
