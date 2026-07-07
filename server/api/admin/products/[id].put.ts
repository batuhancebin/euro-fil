import { db } from '#db'
import { products } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...body } = await readBody(event)

  const validationError = validateProductBody(body)
  if (validationError) throw createError({ statusCode: 400, statusMessage: validationError })

  const [product] = await db.update(products).set({ ...body, updatedAt: new Date() }).where(eq(products.id, id)).returning()
  return product
})
