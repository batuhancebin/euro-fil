import { db } from '#db'
import { products } from '#db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return db.select().from(products).orderBy(asc(products.sortOrder), asc(products.createdAt))
})
