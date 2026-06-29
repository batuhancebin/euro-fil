import { db, contactRequests } from '#db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Ad ve e-posta zorunludur.' })
  }

  const [request] = await db.insert(contactRequests).values({
    name:    body.name,
    email:   body.email,
    phone:   body.phone ?? null,
    message: body.message ?? null,
  }).returning()

  return { ok: true, id: request.id }
})
