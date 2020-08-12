import { app } from '../server'
import request from 'supertest'

describe('GET /api-docs', () => {
  it('SHOULD return 200Ok', (done) => {
    request(app)
      .get('/api-docs/')
      .end((err, res) => {
        expect(res.status).toBe(200)
        done()
      })
  })
})
