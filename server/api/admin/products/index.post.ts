import { db } from '#db'
import { products } from '#db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...body } = await readBody(event)

  const validationError = validateProductBody(body)
  if (validationError) throw createError({ statusCode: 400, statusMessage: validationError })

  const [product] = await db.insert(products).values(body).returning()
  return product
})
