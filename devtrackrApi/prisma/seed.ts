import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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