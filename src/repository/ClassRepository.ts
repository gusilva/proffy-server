import db from '../database/connection'
import { ClassDetail } from '~/src/model/ClassDetail'

export default class ClassRepository {
  async getAvailableClasses(
    weekDay: number,
    subject: string,
    timeInMinutes: number
  ): Promise<ClassDetail[]> {
    return db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(weekDay)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject as string)
      .join('users', 'classes.user_id', 'users.id')
      .select(['classes.*', 'users.*'])
  }

  async save(
    subject: string,
    cost: number,
    userId: number
  ): Promise<number | null> {
    const trx = await db.transaction()
    try {
      const classIdArray = await trx('classes').insert({
        subject,
        cost,
        user_id: userId,
      })
      await trx.commit()

      return classIdArray[0]
    } catch (e) {
      trx.rollback()
      return null
    }
  }
}
