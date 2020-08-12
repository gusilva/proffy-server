import request from 'supertest'
import { app } from '../../server'
import db from '../../database/connection'

describe('API /v1/api/classes', () => {
  beforeAll(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('SHOULD GET - return 200 Ok and class object', (done) => {
    const payload = {
      week_day: 0,
      subject: 'Math',
      time: '08:00',
    }
    const expected = {
      id: 3,
      subject: 'Math',
      cost: 100,
      user_id: 3,
      name: 'User 3',
      avatar: 'https://picsum.photos/id/1008/200/300',
      whatsapp: '333333333',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }

    return request(app)
      .get('/api/v1/classes')
      .query(payload)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual([expected])
        done(err)
      })
  })

  it('SHOULD POST - return 201 Ok and create a new class ', (done) => {
    const payload = {
      name: 'User 4',
      avatar: 'avatar',
      whatsapp: '09090909',
      bio: 'Bio detail',
      subject: 'Programmer',
      cost: 10,
      schedule: [
        {
          week_day: 0,
          from: '08:00',
          to: '10:00',
        },
      ],
    }

    return request(app).post('/api/v1/classes').send(payload).expect(201, done)
  })
})
