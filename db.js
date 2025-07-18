require('dotenv').config();
const {PostgresDialect} = require('@sequelize/postgres');
const {Sequelize} = require('@sequelize/core');

const sequelize = new Sequelize({
  dialect:              PostgresDialect,
  database:             process.env.DB_PG_DATABASE,
  user:                 process.env.DB_PG_USER,
  password:             process.env.DB_PG_PASSWORD,
  host:                 process.env.DB_PG_HOST,
  port:                 process.env.DB_PG_PORT,
  ssl:                  process.env.DB_PG_SSL,
  clientMinMessages:    process.env.DB_PG_CLINT_MIN_MESSAGE,
});

module.exports = {sequelize};
