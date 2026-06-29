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

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const form = await readMultipartFormData(event)
  const file = form?.find(f => f.name === 'file')
  if (!file?.data) throw createError({ statusCode: 400, statusMessage: 'Dosya bulunamadı' })

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
