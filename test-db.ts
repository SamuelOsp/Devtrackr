import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

const pool = new Pool({ connectionString })
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})

async function main() {
  const email = `test-${Date.now()}@test.com`

  const user = await prisma.user.create({
    data: {
      email,
      password: '123',
    },
  })
  console.log('User created:', user)
  await prisma.user.delete({ where: { email } })
  console.log('User deleted — DB working correctly')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })