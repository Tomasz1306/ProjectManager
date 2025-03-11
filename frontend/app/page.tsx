import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import { Button } from "@heroui/button";

const Home = async () => {
  const session = await auth();

  
  console.log(session?.user);
  if (!session) redirect("/auth/sign-in");

  return (
    <>
      <div>
        <p>{session.user?.name}</p>
        <form action={async () => {
          "use server"
          await signOut();
        }}>
          <Button type="submit">Wyloguj</Button>
        </form>
        {/* <Button onPress={() => signOut()}>Wyloguj</Button> */}
      </div>
    </>
  );
};

export default Home;

// const Page = async () => {
//   const session = await auth();

//   return (
//       <>
//       <p>halo</p>
//       </>
//   );
// }

// export default Page;
