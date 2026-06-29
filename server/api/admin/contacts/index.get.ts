import { db, contactRequests } from '#db'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt))
})
