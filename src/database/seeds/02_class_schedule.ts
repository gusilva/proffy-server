import Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  return Promise.resolve(
    knex('class_schedule')
      .del()
      .then(function () {
        return knex('class_schedule').insert([
          {
            id: 1,
            week_day: 0,
            from: 480,
            to: 1080,
            class_id: 1,
          },
          {
            id: 2,
            week_day: 1,
            from: 600,
            to: 900,
            class_id: 3,
          },
          {
            id: 3,
            week_day: 3,
            from: 900,
            to: 1080,
            class_id: 2,
          },
        ])
      })
  )
}
