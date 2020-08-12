import knex from 'knex'

const config = require('../../knexfile')

const db =
  process.env.NODE_ENV === 'test' ? knex(config.test) : knex(config.development)

export default db
