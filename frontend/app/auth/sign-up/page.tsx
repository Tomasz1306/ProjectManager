
import { redirect } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useContext } from "react";


const Page = async () => {



  // if ()

  return (
    <div className="border-1 border-white">
      <form
        // action={async (formData: FormData) => {
        //   "use server";
        //   const res = await signUp(formData);
        //   console.log(res);
        //   if (res.success) {
        //     console.log("UTWORZONO");
        //     redirect("/kanban");
        //   }
        // }}
      >
        <Input
          name="username"
          placeholder="username"
          type="username"
          required
          autoComplete="username"
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