import { db } from '#db'
import { products } from '#db'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return db.select().from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.sortOrder), asc(products.createdAt))
})
