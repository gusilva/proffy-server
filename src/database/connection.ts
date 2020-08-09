import knex from 'knex'
// import path from 'path'

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'docker',
    password: 'docker',
    database: 'proffy',
  },
  // client: 'sqlite3',
  // connection: {
  //   filename: path.resolve(__dirname, 'database.sqlite'),
  // },
  // useNullAsDefault: true,
})

export default db
