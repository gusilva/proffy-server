import { User } from '../../../src/auth/entity/user.entity';

const userEntity = {
  id: 8,
  username: 'string',
  lastname: 'string',
  password: '$2b$10$eCxePKR8PAy8ujveqi0VkOMMo2LNOAC5JFPqM18b/45leReh6WnyO',
  email: 'string@silva.com',
  whatsapp: 'string whatsapp',
  bio: 'string bio',
  subject: 'string subject',
  salt: '$2b$10$eCxePKR8PAy8ujveqi0VkO',
  lessons: [],
};

const userDtoExpected = {
  username: 'string',
  lastname: 'string',
  email: 'string@silva.com',
  whatsapp: 'string whatsapp',
  bio: 'string bio',
  subject: 'string subject',
};

describe('User Entity', () => {
  it('should convert an user entity to an user dto', () => {
    const usr = User.toDto(userEntity as User);
    expect(usr).toEqual(userDtoExpected);
  });
});
