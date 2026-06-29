import { db } from '#db'
import { products } from '#db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const [product] = await db.insert(products).values(body).returning()
  return product
})
