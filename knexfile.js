// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  client: 'mysql2',
  connection: {
    database: 'db_tech_quest',
    user: 'nickciuffi',
    password: 'Niisaricris1',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },

};
