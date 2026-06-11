import { cookies } from "next/headers";
import crypto from "node:crypto";
import {
  Chapter,
  deleteSession,
  getAdminById,
  getChapterById,
  getSession,
  insertSession,
} from "./db";

const COOKIE = "nytt_session";
const SESSION_DAYS = 30;

export async function startSession(who: {
  chapterId?: number;
  adminId?: number;
}) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 86400_000);
  insertSession(token, who, expires.toISOString().replace("T", " ").slice(0, 19));
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires,
    path: "/",
  });
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) deleteSession(token);
  store.delete(COOKIE);
}

export async function getSessionChapter(): Promise<Chapter | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  const session = getSession(token);
  if (!session?.chapter_id) return null;
  return getChapterById(session.chapter_id) ?? null;
}

export async function getSessionAdmin(): Promise<{
  id: number;
  username: string;
} | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  const session = getSession(token);
  if (!session?.admin_id) return null;
  return getAdminById(session.admin_id) ?? null;
}
