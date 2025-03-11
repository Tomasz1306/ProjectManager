
import { title } from "@/components/primitives";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
import { executeAction } from "@/lib/executeAction";
import { Input } from "@heroui/input";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();

  console.log(session);

  if (session) redirect("/pricing");
  return (
    <div className="border-1 border-white">
      <form
        action={async (formData: FormData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
              });
            },
          });
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
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

export default Page;