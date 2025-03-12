"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginModal } from "@/components/login-modal";

export default async function signInPage() {
  const session = await auth();

  if (session) redirect("/");

  return <LoginModal />;
}
