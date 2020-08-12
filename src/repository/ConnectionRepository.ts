import db from '../database/connection'
import Connection from '../model/Connection'

export default class ConnectionRepository {
  async save(connection: Connection): Promise<boolean> {
    const trx = await db.transaction()
    try {
      const result = await trx('connections').insert(connection)
      await trx.commit()

      return result.length > 0
    } catch (e) {
      await trx.rollback()
      return false
    }
  }

  async total(): Promise<number> {
    const total = await db('connections').count('* as count')
    return Number(total[0].count)
  }
}
