import { ClassDetail } from '~/src/model/ClassDetail'
import {ClassDto} from "~/src/model/dtos/ClassDto";

export default class ClassMap {
  static toListDto(classDetail: ClassDetail[]): (ClassDto | null)[] {
    return classDetail.map(cls => this.toDto(cls))
  }

  static toDto(classDetail: ClassDetail | null | undefined): ClassDto | null {
    if (classDetail == null) return null
    return {
      classId: classDetail.id,
      subject: classDetail.subject,
      cost: classDetail.cost,
      userId: classDetail.user_id,
      name: classDetail.name,
      avatar: classDetail.avatar,
      whatsapp: classDetail.whatsapp,
      bio: classDetail.bio
    }
  }
}
