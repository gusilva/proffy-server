import db from '../database/connection'

export default class ClassScheduleRepository {
  async save(
    class_id: number,
    week_day: number,
    from: number,
    to: number
  ): Promise<number | null> {
    const trx = await db.transaction()
    try {
      const classScheduleIds = await trx('class_schedule').insert({
        class_id,
        week_day,
        from,
        to,
      })

      await trx.commit()

      return classScheduleIds[0]
    } catch (e) {
      trx.rollback()
      return null
    }
  }
}
