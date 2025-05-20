import prisma from '@/lib/prisma';
import { userFactory } from './user';

const main = async () => {
  await prisma.user.deleteMany();
  for (let i = 0; i < 10; i++) {
    await userFactory();
  }
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
