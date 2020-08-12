import ClassMap from "../ClassMap";
import {ClassDetail} from "../../model/ClassDetail";
import {ClassDto} from "../../model/dtos/ClassDto";

const classDetail: ClassDetail[] = [{
  id: 3,
  subject: 'Math',
  cost: 100,
  user_id: 3,
  name: 'User 3',
  avatar: 'https://picsum.photos/id/1008/200/300',
  whatsapp: '333333333',
  bio: 'Lorem ipsum.',
},{
  id: 2,
  subject: 'History',
  cost: 10,
  user_id: 5,
  name: 'User 3',
  avatar: 'https://picsum.photos/id/300',
  whatsapp: '444444444',
  bio: 'Lorem ipsum ipsum.',
}]

const classDto: ClassDto[] = [{
  classId: 3,
  subject: 'Math',
  cost: 100,
  userId: 3,
  name: 'User 3',
  avatar: 'https://picsum.photos/id/1008/200/300',
  whatsapp: '333333333',
  bio: 'Lorem ipsum.',
},{
  classId: 2,
  subject: 'History',
  cost: 10,
  userId: 5,
  name: 'User 3',
  avatar: 'https://picsum.photos/id/300',
  whatsapp: '444444444',
  bio: 'Lorem ipsum ipsum.',
}]

describe('Class map', () => {
  it('should return null if it receive a empty object', function () {
    expect(ClassMap.toDto(null)).toBeNull()
  });

  it('should convert a ClassDetail object to a ClassDto', function () {
    expect(classDto[0]).toEqual(ClassMap.toDto(classDetail[0]))
  });

  it('should convert to a list of ClassDtos', function () {
    expect(ClassMap.toListDto(classDetail)).toEqual(classDto)
  });

  it('should return a empty list if classDetail is empty', function () {
    expect(ClassMap.toListDto([])).toEqual([])
  });
})
