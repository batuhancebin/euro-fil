export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  if (password !== process.env.ADMIN_PASSWORD) {
    throw createError({ statusCode: 401, statusMessage: 'Hatalı şifre' })
  }
  await setUserSession(event, { user: { admin: true } })
  return { ok: true }
})
