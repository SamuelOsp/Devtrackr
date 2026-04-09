import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Food' },
      { name: 'Transport' },
      { name: 'Subscriptions' },
      { name: 'Education' },
      { name: 'Housing' },
      { name: 'Health' },
      { name: 'Entertainment' },
      { name: 'Freelance' },
      { name: 'Other' },
    ],
    skipDuplicates: true,
  })
  console.log('Categories seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())