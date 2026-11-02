"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/session";

export type LoginState = { error?: string; username?: string };

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; since: number }>();

function safeEqual(a: string, b: string) {
  const digest = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(digest(a), digest(b));
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass || !process.env.SESSION_SECRET) {
    return { error: "Admin login isn’t configured. Set ADMIN_USERNAME, ADMIN_PASSWORD and SESSION_SECRET in .env.local." };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const record = failures.get(ip);
  if (record && Date.now() - record.since < WINDOW_MS && record.count >= MAX_FAILURES) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  const username = String(formData.get("username") ?? "");
  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(String(formData.get("password") ?? ""), expectedPass);
  if (!(userOk && passOk)) {
    const fresh = !record || Date.now() - record.since >= WINDOW_MS;
    failures.set(ip, { count: fresh ? 1 : record.count + 1, since: fresh ? Date.now() : record.since });
    await sleep(600);
    return { error: "That username and password don’t match.", username };
  }

  failures.delete(ip);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
