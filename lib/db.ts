import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "nytt.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

db.exec(`
CREATE TABLE IF NOT EXISTS chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  phone TEXT,
  motivation TEXT,
  password_hash TEXT NOT NULL,
  is_founding INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved')),
  member_count INTEGER NOT NULL DEFAULT 0,
  established_year INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  format TEXT,
  starts_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (event_id, chapter_id)
);
`);

export interface Chapter {
  id: number;
  school_name: string;
  city: string;
  state: string | null;
  contact_name: string;
  contact_title: string | null;
  email: string;
  phone: string | null;
  motivation: string | null;
  is_founding: number;
  status: "pending" | "approved";
  member_count: number;
  established_year: number | null;
  created_at: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  published_at: string;
}

export interface EventRow {
  id: number;
  title: string;
  description: string;
  location: string | null;
  format: string | null;
  starts_at: string;
  created_at: string;
}

/* Public-facing columns only. password_hash never leaves this module
   except for the comparison helpers below. */
const CHAPTER_COLS = `id, school_name, city, state, contact_name, contact_title,
  email, phone, motivation, is_founding, status, member_count, established_year, created_at`;

function seed() {
  const chapterCount = db
    .prepare("SELECT COUNT(*) AS n FROM chapters")
    .get() as { n: number };
  if (chapterCount.n === 0) {
    const seedPath = path.join(process.cwd(), "lib", "seed-chapters.json");
    if (fs.existsSync(seedPath)) {
      const rows: {
        schoolName: string;
        city: string;
        state: string;
        contactName: string;
        contactTitle: string;
        email: string;
        phone: string;
        motivation: string;
        isFoundingChapter: boolean;
        isApproved: boolean;
        memberCount: number;
        establishedYear: number;
      }[] = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
      // Imported accounts are locked ('imported' is not a valid bcrypt hash,
      // so comparison always fails); new registrations create working logins.
      const insert = db.prepare(`
        INSERT OR IGNORE INTO chapters
          (school_name, city, state, contact_name, contact_title, email, phone,
           motivation, password_hash, is_founding, status, member_count, established_year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'imported', ?, ?, ?, ?)`);
      const insertAll = db.transaction(() => {
        for (const r of rows) {
          insert.run(
            r.schoolName?.trim() || "Unnamed Chapter",
            r.city?.trim() || "",
            r.state?.trim() || null,
            r.contactName?.trim() || "",
            r.contactTitle?.trim() || null,
            r.email?.trim() || `${Math.random().toString(36).slice(2)}@imported.invalid`,
            r.phone?.trim() || null,
            r.motivation?.trim() || null,
            r.isFoundingChapter ? 1 : 0,
            r.isApproved ? "approved" : "pending",
            r.memberCount ?? 0,
            r.establishedYear ?? null,
          );
        }
      });
      insertAll();
    }
  }

  const adminCount = db.prepare("SELECT COUNT(*) AS n FROM admins").get() as {
    n: number;
  };
  if (adminCount.n === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "nytt-admin";
    // OR IGNORE: concurrent processes may race this block; one wins, the
    // rest no-op instead of throwing SQLITE_CONSTRAINT_UNIQUE.
    db.prepare(
      "INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)",
    ).run(username, bcrypt.hashSync(password, 10));
  }
}

// `next build` imports this module from parallel workers while collecting
// page data; the build container's database is throwaway anyway. Seed only
// at runtime, where the persistent volume is mounted.
if (process.env.NEXT_PHASE !== "phase-production-build") {
  seed();
}

/* ---------- Chapters ---------- */

export function getApprovedChapters(): Chapter[] {
  return db
    .prepare(
      `SELECT ${CHAPTER_COLS} FROM chapters WHERE status = 'approved'
       ORDER BY is_founding DESC, school_name COLLATE NOCASE`,
    )
    .all() as Chapter[];
}

export function getAllChapters(): Chapter[] {
  return db
    .prepare(
      `SELECT ${CHAPTER_COLS} FROM chapters
       ORDER BY status DESC, created_at DESC`,
    )
    .all() as Chapter[];
}

export function getChapterById(id: number): Chapter | undefined {
  return db
    .prepare(`SELECT ${CHAPTER_COLS} FROM chapters WHERE id = ?`)
    .get(id) as Chapter | undefined;
}

export function getChapterByEmail(email: string): Chapter | undefined {
  return db
    .prepare(`SELECT ${CHAPTER_COLS} FROM chapters WHERE email = ?`)
    .get(email.trim()) as Chapter | undefined;
}

export function createChapter(input: {
  schoolName: string;
  city: string;
  state: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  motivation: string;
  password: string;
}): number {
  const result = db
    .prepare(
      `INSERT INTO chapters
        (school_name, city, state, contact_name, contact_title, email, phone,
         motivation, password_hash, status, established_year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    )
    .run(
      input.schoolName.trim(),
      input.city.trim(),
      input.state.trim(),
      input.contactName.trim(),
      input.contactTitle.trim(),
      input.email.trim(),
      input.phone.trim(),
      input.motivation.trim(),
      bcrypt.hashSync(input.password, 10),
      new Date().getFullYear(),
    );
  return Number(result.lastInsertRowid);
}

export function verifyChapterLogin(
  email: string,
  password: string,
): Chapter | null {
  const row = db
    .prepare("SELECT id, password_hash FROM chapters WHERE email = ?")
    .get(email.trim()) as { id: number; password_hash: string } | undefined;
  if (!row) return null;
  let ok = false;
  try {
    ok = bcrypt.compareSync(password, row.password_hash);
  } catch {
    ok = false; // imported/locked accounts have non-bcrypt hashes
  }
  return ok ? (getChapterById(row.id) ?? null) : null;
}

export function setChapterStatus(id: number, status: "pending" | "approved") {
  db.prepare("UPDATE chapters SET status = ? WHERE id = ?").run(status, id);
}

export function deleteChapter(id: number) {
  db.prepare("DELETE FROM chapters WHERE id = ?").run(id);
}

/* ---------- Admins ---------- */

export function verifyAdminLogin(
  username: string,
  password: string,
): { id: number; username: string } | null {
  const row = db
    .prepare("SELECT id, username, password_hash FROM admins WHERE username = ?")
    .get(username.trim()) as
    | { id: number; username: string; password_hash: string }
    | undefined;
  if (!row) return null;
  return bcrypt.compareSync(password, row.password_hash)
    ? { id: row.id, username: row.username }
    : null;
}

export function getAdminById(
  id: number,
): { id: number; username: string } | undefined {
  return db.prepare("SELECT id, username FROM admins WHERE id = ?").get(id) as
    | { id: number; username: string }
    | undefined;
}

/* ---------- Sessions ---------- */

export function insertSession(
  token: string,
  who: { chapterId?: number; adminId?: number },
  expiresAt: string,
) {
  db.prepare(
    "INSERT INTO sessions (token, chapter_id, admin_id, expires_at) VALUES (?, ?, ?, ?)",
  ).run(token, who.chapterId ?? null, who.adminId ?? null, expiresAt);
}

export function getSession(
  token: string,
): { chapter_id: number | null; admin_id: number | null } | undefined {
  db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
  return db
    .prepare(
      "SELECT chapter_id, admin_id FROM sessions WHERE token = ? AND expires_at >= datetime('now')",
    )
    .get(token) as
    | { chapter_id: number | null; admin_id: number | null }
    | undefined;
}

export function deleteSession(token: string) {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

/* ---------- Posts ---------- */

export function getPosts(): Post[] {
  return db
    .prepare("SELECT * FROM posts ORDER BY published_at DESC")
    .all() as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug) as
    | Post
    | undefined;
}

export function createPost(input: {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
}) {
  db.prepare(
    "INSERT INTO posts (slug, title, excerpt, body, author) VALUES (?, ?, ?, ?, ?)",
  ).run(input.slug, input.title, input.excerpt, input.body, input.author);
}

export function deletePost(id: number) {
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
}

/* ---------- Events ---------- */

export function getUpcomingEvents(): EventRow[] {
  return db
    .prepare(
      "SELECT * FROM events WHERE starts_at >= datetime('now', '-1 day') ORDER BY starts_at",
    )
    .all() as EventRow[];
}

export function getAllEvents(): EventRow[] {
  return db.prepare("SELECT * FROM events ORDER BY starts_at DESC").all() as EventRow[];
}

export function createEvent(input: {
  title: string;
  description: string;
  location: string;
  format: string;
  startsAt: string;
}) {
  db.prepare(
    "INSERT INTO events (title, description, location, format, starts_at) VALUES (?, ?, ?, ?, ?)",
  ).run(input.title, input.description, input.location, input.format, input.startsAt);
}

export function deleteEvent(id: number) {
  db.prepare("DELETE FROM events WHERE id = ?").run(id);
}

export function registerChapterForEvent(eventId: number, chapterId: number) {
  db.prepare(
    "INSERT OR IGNORE INTO event_registrations (event_id, chapter_id) VALUES (?, ?)",
  ).run(eventId, chapterId);
}

export function getChapterEventIds(chapterId: number): number[] {
  return (
    db
      .prepare("SELECT event_id FROM event_registrations WHERE chapter_id = ?")
      .all(chapterId) as { event_id: number }[]
  ).map((r) => r.event_id);
}

export function getEventRegistrationCounts(): Map<number, number> {
  const rows = db
    .prepare(
      "SELECT event_id, COUNT(*) AS n FROM event_registrations GROUP BY event_id",
    )
    .all() as { event_id: number; n: number }[];
  return new Map(rows.map((r) => [r.event_id, r.n]));
}
