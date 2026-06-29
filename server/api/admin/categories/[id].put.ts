import { db, categories } from '#db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const [cat] = await db.update(categories).set(body).where(eq(categories.id, id)).returning()
  return cat
})
