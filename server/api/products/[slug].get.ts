import { db, products } from '#db'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const [product] = await db.select().from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
  if (!product) throw createError({ statusCode: 404 })
  return product
})
