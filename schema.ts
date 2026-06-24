import { pgTable, serial, text, timestamp, integer, boolean, varchar } from "drizzle-orm/pg-core";

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }).notNull().default("general"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("USD"),
  imageUrl: text("image_url"),
  available: boolean("available").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: varchar("date", { length: 100 }).notNull(),
  time: varchar("time", { length: 100 }),
  location: varchar("location", { length: 255 }),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orphanageImages = pgTable("orphanage_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorName: varchar("donor_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("USD"),
  method: varchar("method", { length: 50 }).notNull(),
  purpose: varchar("purpose", { length: 100 }).notNull().default("general"),
  reference: varchar("reference", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mediaItems = pgTable("media_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 20 }).notNull().default("image"),
  url: text("url").notNull(),
  thumbnail: text("thumbnail"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const livestreamSettings = pgTable("livestream_settings", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(),
  embedUrl: text("embed_url"),
  channelUrl: text("channel_url"),
  isLive: boolean("is_live").default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bibleSchoolImages = pgTable("bible_school_images", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bibleSchoolEnrollments = pgTable("bible_school_enrollments", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  age: varchar("age", { length: 10 }),
  address: text("address"),
  course: varchar("course", { length: 255 }),
  experience: varchar("experience", { length: 100 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const onlineMembers = pgTable("online_members", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  country: varchar("country", { length: 100 }),
  prayerRequest: text("prayer_request"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 50 }).notNull().default("website"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const churchMembers = pgTable("church_members", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  role: varchar("role", { length: 100 }),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const uploadedVideos = pgTable("uploaded_videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  videoData: text("video_data").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notificationSubscribers = pgTable("notification_subscribers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
