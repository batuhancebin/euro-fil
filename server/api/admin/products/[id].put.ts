import { db } from '#db'
import { products } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const [product] = await db.update(products).set({ ...body, updatedAt: new Date() }).where(eq(products.id, id)).returning()
  return product
})
