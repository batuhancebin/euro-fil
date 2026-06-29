import { db } from '#db'
import { products } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  await db.delete(products).where(eq(products.id, id))
  return { ok: true }
})
