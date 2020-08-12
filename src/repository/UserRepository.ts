import db from '../database/connection'

export default class UserRepository {
  async save(
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
  ): Promise<number | null> {
    const trx = await db.transaction()
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })
      await trx.commit()

      return insertedUsersIds[0]
    } catch (e) {
      trx.rollback()
      return null
    }
  }
}
