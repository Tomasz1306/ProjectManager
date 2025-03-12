"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

const Home = async() => {
  const session = await auth();

  console.log(session);
  if (!session) redirect("/auth/sign-in");

  return (
    <>
    <p>Witaj {session?.user?.email}</p>
    </>
  );
};

export default Home;
