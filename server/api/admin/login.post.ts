export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'

  if (isLoginLocked(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.' })
  }

  const { password } = await readBody(event)
  if (password !== process.env.ADMIN_PASSWORD) {
    recordLoginFailure(ip)
    throw createError({ statusCode: 401, statusMessage: 'Hatalı şifre' })
  }

  recordLoginSuccess(ip)
  await setUserSession(event, { user: { admin: true } })
  return { ok: true }
})
