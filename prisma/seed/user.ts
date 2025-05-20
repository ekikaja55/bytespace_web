import { faker } from '@faker-js/faker';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
export const userFactory = async () => {
  return await prisma.user.create({
    data: {
      user_name: faker.person.fullName(),
      user_email: faker.internet.email(),
      user_password: await bcryptjs.hash('12345678', 10),
      user_role: faker.helpers.arrayElement(['admin', 'user']),
      user_gender: faker.helpers.arrayElement(['male', 'female']),
      user_date_birth: faker.date.birthdate(),
      user_profile_image: faker.image.avatar(),
      user_api_key: faker.string.uuid(),
      user_refresh_token: '',
      user_subscription: [],
      user_transaction: [],
    },
  });
};
