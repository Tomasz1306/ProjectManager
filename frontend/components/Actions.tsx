"use server"

import { executeAction } from "@/lib/executeAction";
import { signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function ClientLogin(formData: FormData) {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    //   await signIn("credentials", { email, password });
    await executeAction({
      actionFn: async () => {
        await signIn("credentials", {
          email: email,
          password: password,
        });
      },
    });
}

export async function ClientRegister() {

}

export async function ClientLogout() {
    await signOut();
    redirect ("/");
}