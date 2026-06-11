"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createChapter,
  createEvent,
  createPost,
  deleteChapter,
  deleteEvent,
  deletePost,
  getChapterByEmail,
  registerChapterForEvent,
  setChapterStatus,
  verifyAdminLogin,
  verifyChapterLogin,
} from "./db";
import { endSession, getSessionAdmin, getSessionChapter, startSession } from "./auth";

/* React 19 resets uncontrolled forms after a server action completes, so
   error states return the submitted values (never passwords) and the forms
   repopulate via defaultValue. */
export type FormState = {
  error?: string;
  values?: Record<string, string>;
} | null;

function keepValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "password") values[key] = value;
  }
  return values;
}

/* ---------- Chapter auth ---------- */

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password)
    return { error: "Enter your email and password.", values: keepValues(formData) };

  const chapter = verifyChapterLogin(email, password);
  if (!chapter)
    return {
      error: "That email and password combination is not right.",
      values: keepValues(formData),
    };

  await startSession({ chapterId: chapter.id });
  redirect("/dashboard");
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

export async function registerChapterAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const fields = {
    schoolName: String(formData.get("schoolName") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    contactTitle: String(formData.get("contactTitle") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    motivation: String(formData.get("motivation") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };

  const values = keepValues(formData);
  if (!fields.schoolName || !fields.city || !fields.contactName || !fields.email) {
    return { error: "School name, city, contact name, and email are required.", values };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { error: "That email address does not look valid.", values };
  }
  if (fields.password.length < 8) {
    return { error: "Choose a password of at least 8 characters.", values };
  }
  if (fields.motivation.length < 40) {
    return {
      error: "Tell us a bit more about why you want to start a chapter (a few sentences).",
      values,
    };
  }
  if (getChapterByEmail(fields.email)) {
    return { error: "A chapter application already exists for this email. Try logging in.", values };
  }

  const id = createChapter(fields);
  await startSession({ chapterId: id });
  revalidatePath("/chapters");
  redirect("/dashboard");
}

/* ---------- Event registration (chapter) ---------- */

export async function registerForEventAction(formData: FormData) {
  const chapter = await getSessionChapter();
  if (!chapter) redirect("/login?next=/events");
  const eventId = Number(formData.get("eventId"));
  if (Number.isInteger(eventId) && eventId > 0) {
    registerChapterForEvent(eventId, chapter.id);
  }
  revalidatePath("/events");
  revalidatePath("/dashboard");
}

/* ---------- Admin auth ---------- */

export async function adminLoginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!username || !password)
    return { error: "Enter your username and password.", values: keepValues(formData) };

  const admin = verifyAdminLogin(username, password);
  if (!admin) return { error: "Invalid admin credentials.", values: keepValues(formData) };

  await startSession({ adminId: admin.id });
  redirect("/admin");
}

/* ---------- Admin: chapters ---------- */

async function requireAdmin() {
  const admin = await getSessionAdmin();
  if (!admin) redirect("/admin-login");
  return admin;
}

export async function approveChapterAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) setChapterStatus(id, "approved");
  revalidatePath("/admin");
  revalidatePath("/chapters");
}

export async function rejectChapterAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) deleteChapter(id);
  revalidatePath("/admin");
  revalidatePath("/chapters");
}

/* ---------- Admin: journal ---------- */

export async function createPostAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  if (!title || !excerpt || !body || !author) {
    return {
      error: "Title, excerpt, body, and author are all required.",
      values: keepValues(formData),
    };
  }
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) +
    "-" +
    Date.now().toString(36);
  createPost({ slug, title, excerpt, body, author });
  revalidatePath("/blog");
  revalidatePath("/admin");
  return null;
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) deletePost(id);
  revalidatePath("/blog");
  revalidatePath("/admin");
}

/* ---------- Admin: events ---------- */

export async function createEventAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const format = String(formData.get("format") ?? "").trim();
  const startsAt = String(formData.get("startsAt") ?? "").trim();
  if (!title || !description || !startsAt) {
    return { error: "Title, description, and date are required.", values: keepValues(formData) };
  }
  if (Number.isNaN(new Date(startsAt.replace(" ", "T")).getTime())) {
    return { error: "That date and time could not be read.", values: keepValues(formData) };
  }
  createEvent({
    title,
    description,
    location,
    format,
    startsAt: startsAt.replace("T", " "),
  });
  revalidatePath("/events");
  revalidatePath("/admin");
  return null;
}

export async function deleteEventAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isInteger(id)) deleteEvent(id);
  revalidatePath("/events");
  revalidatePath("/admin");
}
