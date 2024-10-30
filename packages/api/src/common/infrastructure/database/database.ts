import knex from "knex";
import * as dotenv from "dotenv";
dotenv.config();

export const pg = knex({
  client: "pg",
  connection: process.env.CONNECTION_STRING,
  migrations: {
    directory: "../../../../migrations",
  },
});
