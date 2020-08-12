import db from '../../database/connection'
import ClassScheduleRepository from '../ClassScheduleRepository'

describe('Class Schedule Repository', () => {
  const repo = new ClassScheduleRepository()

  beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
  })

  afterEach(() => {
    return db.destroy()
  })

  it('should return the id of the class schedule saved', async (done) => {
    const result = await repo.save(1, 0, 720, 1080)
    expect(result).toBe(4)
    done()
  })
})
