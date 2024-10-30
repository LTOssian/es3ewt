import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: "0.0.0.0",
      user: process.env.POSTGRES_USER, // Change if different
      password: process.env.POSTGRES_PASSWORD, // Change if different
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./fixtures",
    },
  },

  staging: {
    client: "postgresql",
    connection: process.env.CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: process.env.CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
