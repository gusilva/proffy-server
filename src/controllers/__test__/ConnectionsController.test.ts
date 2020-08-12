import request from 'supertest'
import { app } from '../../server'
import db from '../../database/connection'

describe('API /v1/api/connections', () => {
  beforeAll(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('SHOULD GET - return 200 Ok and total of connections', (done) => {
    return request(app)
      .get('/api/v1/connections')
      .expect(200)
      .end((err, res) => {
        expect(res.body.total).toBe(4)
        done(err)
      })
  })

  it('SHOULD POST - return 201', (done) => {
    return request(app)
      .post('/api/v1/connections')
      .send({ user_id: 1 })
      .expect(201, done)
  })
})
