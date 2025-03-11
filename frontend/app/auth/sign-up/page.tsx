
import { title } from "@/components/primitives";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
import { executeAction } from "@/lib/executeAction";
import { Input } from "@heroui/input";
import { auth } from "@/lib/auth";
import {signUp} from "@/lib/actions"

const Page = async () => {

  const session = await auth();
  if (session) redirect("/")

  return (
    <div className="border-1 border-white">
      <form
        action={async (formData: FormData) => {
          "use server";
          const res = await signUp(formData);
          console.log(res);
          if (res.success) {
            console.log("UTWORZONO");
            redirect("/kanban");
          }
        }}
      >
        <Input
          name="email"
          placeholder="email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="password"
          type="password"
          required
          autoComplete="password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default Page;