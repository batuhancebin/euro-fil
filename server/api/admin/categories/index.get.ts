import { db, categories } from '#db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.createdAt))
})
