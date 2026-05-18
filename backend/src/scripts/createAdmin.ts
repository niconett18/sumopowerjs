import bcrypt from 'bcryptjs';
import { db } from '../db';

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: npm run create-admin -- <email> <password>');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await db.admin.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });

  console.log(`✅  Admin created/updated: ${admin.email} (id: ${admin.id})`);
  await db.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
