import { pgTable, serial, text, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id:        serial('id').primaryKey(),
  slug:      text('slug').notNull().unique(),
  nameTr:    text('name_tr').notNull(),
  nameEn:    text('name_en').notNull().default(''),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
  id:         serial('id').primaryKey(),
  slug:       text('slug').notNull().unique(),
  nameTr:     text('name_tr').notNull(),
  nameEn:     text('name_en').notNull().default(''),
  category:   text('category').notNull(),
  descTr:     text('desc_tr').notNull().default(''),
  descEn:     text('desc_en').notNull().default(''),
  images:     jsonb('images').$type<string[]>().default([]),
  bg:         text('bg').default('#1c1c1f'),
  specsTr:    jsonb('specs_tr').$type<string[]>().default([]),
  specsEn:    jsonb('specs_en').$type<string[]>().default([]),
  maxPressure: text('max_pressure'),
  maxTemp:     text('max_temp'),
  variants:    jsonb('variants').$type<{ code: string; cins: string; connection: string }[]>().default([]),
  price:      text('price'),
  priceNote:  text('price_note'),
  seoTitleTr: text('seo_title_tr'),
  seoTitleEn: text('seo_title_en'),
  seoDescTr:  text('seo_desc_tr'),
  seoDescEn:  text('seo_desc_en'),
  isFeatured: boolean('is_featured').default(false),
  isActive:   boolean('is_active').default(true),
  sortOrder:  integer('sort_order').default(0),
  createdAt:  timestamp('created_at').defaultNow(),
  updatedAt:  timestamp('updated_at').defaultNow(),
})

export const contactRequests = pgTable('contact_requests', {
  id:          serial('id').primaryKey(),
  name:        text('name').notNull(),
  email:       text('email').notNull(),
  phone:       text('phone'),
  message:     text('message'),
  productSlug: text('product_slug'),
  createdAt:   timestamp('created_at').defaultNow(),
})
