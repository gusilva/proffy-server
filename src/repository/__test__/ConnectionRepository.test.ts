import ConnectionRepository from '../ConnectionRepository'

import db from '../../database/connection'

describe('Connection Repo - save', () => {
  const repo = new ConnectionRepository()

  beforeEach(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should return true if success', async (done) => {
    const result = await repo.save({user_id: 10})
    expect(result).toBe(true)
    done()
  })

  it('should return total of connections', async (done) => {
    const repo = new ConnectionRepository()
    const result = await repo.total()
    expect(result).toBe(4)
    done()
  })
})
