import db from '../../database/connection'
import ClassRepository from '../ClassRepository'

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

describe('Class Repository', () => {
  const repo = new ClassRepository()

  beforeEach(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should return true the class object with information about the class', async (done) => {
    const result = await repo.getAvailableClasses(0, 'Math', 480)
    expect(result).toEqual([expected])
    done()
  })

  it('should return total of connections', async (done) => {
    const result = await repo.save('Math', 180, 1)
    expect(result).toBe(4)
    done()
  })
})
