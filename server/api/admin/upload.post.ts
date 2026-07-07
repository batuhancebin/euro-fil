import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10MB

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const declaredLength = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (declaredLength > MAX_UPLOAD_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Dosya çok büyük (maksimum 10MB)' })
  }

  const form = await readMultipartFormData(event)
  const file = form?.find(f => f.name === 'file')
  if (!file?.data) throw createError({ statusCode: 400, statusMessage: 'Dosya bulunamadı' })
  if (file.data.length > MAX_UPLOAD_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Dosya çok büyük (maksimum 10MB)' })
  }

  // WebP dönüşümü + optimizasyon
  const webpBuffer = await sharp(file.data)
    .webp({ quality: 82 })
    .toBuffer()

  const filename = `euro-fil/products/${randomUUID()}.webp`

  await s3.send(new PutObjectCommand({
    Bucket:      process.env.R2_BUCKET_NAME!,
    Key:         filename,
    Body:        webpBuffer,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000',
  }))

  const url = `${process.env.R2_PUBLIC_URL}/${filename}`
  return { url }
})
