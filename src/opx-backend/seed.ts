import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await argon2.hash('12345678');

  const user = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      password: hashedPassword,
    },
  });

  console.log('Admin creado:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());