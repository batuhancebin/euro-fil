import { db } from '#db'
import { products } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const [product] = await db.select().from(products).where(eq(products.id, id))
  if (!product) throw createError({ statusCode: 404 })
  return product
})
