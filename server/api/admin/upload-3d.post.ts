import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024 // 30MB — optimized (Draco-compressed) .glb files should be a few MB

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const declaredLength = Number(getRequestHeader(event, 'content-length') ?? 0)
  if (declaredLength > MAX_UPLOAD_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Dosya çok büyük (maksimum 30MB — yüklemeden önce sıkıştırın)' })
  }

  const form = await readMultipartFormData(event)
  const file = form?.find(f => f.name === 'file')
  if (!file?.data) throw createError({ statusCode: 400, statusMessage: 'Dosya bulunamadı' })
  if (file.data.length > MAX_UPLOAD_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Dosya çok büyük (maksimum 30MB — yüklemeden önce sıkıştırın)' })
  }
  if (!file.filename?.toLowerCase().endsWith('.glb')) {
    throw createError({ statusCode: 400, statusMessage: 'Sadece .glb dosyaları desteklenir' })
  }

  const filename = `euro-fil/products/3d/${randomUUID()}.glb`

  await s3.send(new PutObjectCommand({
    Bucket:       process.env.R2_BUCKET_NAME!,
    Key:          filename,
    Body:         file.data,
    ContentType:  'model/gltf-binary',
    CacheControl: 'public, max-age=31536000',
  }))

  const url = `${process.env.R2_PUBLIC_URL}/${filename}`
  return { url }
})
