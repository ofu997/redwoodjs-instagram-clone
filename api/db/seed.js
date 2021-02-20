/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
  //   if (!existing.length) {
  //     await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
  //   }

    const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
    if (!existing.length) {
      await db.image.create(
        {
          data: {
              title: 'first',
              url: 'https://firebasestorage.googleapis.com/v0/b/social-media-redwood.appspot.com/o/images%2Fafternoon-waterfall.jpg?alt=media&token=7d71dd5d-cb23-4a06-a77c-c885cd4c68f1',
              likes: 0,
              userId: 1
          }
        }
      )

      db.comment.create(
        {
          data: {
            body: 'comment 1', imageId: 1, posterId: 1
          }
        }
      )

      db.user.create({
        data: {
          name:, handle:, email:, password:,
        }
      })
    }


  console.info('No data to seed. See api/db/seeds.js for info.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
