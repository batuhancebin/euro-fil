import { db, categories } from '#db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const [cat] = await db.insert(categories).values(body).returning()
  return cat
})
