import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  return Promise.resolve(
    knex('connections')
      .del()
      .then(function () {
        return knex('connections').insert([
          {
            id: 1,
            user_id: 3,
          },
          {
            id: 2,
            user_id: 1,
          },
          {
            id: 3,
            user_id: 2,
          },
          {
            id: 4,
            user_id: 2,
          },
        ])
      })
  )
}
