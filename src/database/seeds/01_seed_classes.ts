import Knex from 'knex'

exports.seed = function (knex: Knex): Promise<any> {
  return Promise.resolve(
    knex('classes')
      .del()
      .then(function () {
        return knex('classes').insert([
          {
            id: 1,
            subject: 'Math',
            cost: '100',
            user_id: 3,
          },
          {
            id: 2,
            subject: 'History',
            cost: '150',
            user_id: 2,
          },
          {
            id: 3,
            subject: 'English',
            cost: '30',
            user_id: 1,
          },
        ])
      })
  )
}
