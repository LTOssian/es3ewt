import { Knex } from "knex";
import bcrypt from "bcrypt";

const tableName = "user";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    {
      username: "Louisan",
      password: await bcrypt.hash("abcdefg", 10),
    },
    { username: "Benjos", password: await bcrypt.hash("azertyu", 10) },
    { username: "Aless", password: await bcrypt.hash("password", 10) },
  ]);
}
