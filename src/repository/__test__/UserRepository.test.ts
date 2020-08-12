import db from '../../database/connection'
import UserRepository from '../UserRepository'

describe('User Repository', () => {
  const repo = new UserRepository()

  beforeEach(async () => {
    await db.migrate.latest()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should return the id of the user saved', async (done) => {
    const result = await repo.save(
      'User 4',
      'Avatar 4',
      '999900000',
      'Bio user 4'
    )
    expect(result).toBe(1)
    done()
  })
})
