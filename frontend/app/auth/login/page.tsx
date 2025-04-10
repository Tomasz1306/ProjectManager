"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { addToast, ToastProvider } from "@heroui/toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

interface Credential {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credential>({
    email: "",
    password: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  function handleChange(e: any) {
    const copy = { ...credentials };
    const key = e.target.name as keyof typeof copy;
    copy[key] = e.target.value;
    setCredentials(copy);
  }

  async function handleLoginSubmit() {
    const res = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log(res);

    if (res.ok) {
      const json = await res.json();
      console.log(json);
      localStorage.setItem("token", json.token);
      localStorage.setItem("email", credentials.email);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      addToast({
        title: "Hi, you'e logged correctly",
        description: "Please rewrite your credentials",
        color: "success",
        radius: "none",

      });
      router.push("/");
    } else {
      addToast({
        title: "Wrong email or password",
        description: "Please rewrite your credentials",
        color: "danger",
        radius: "none",
        classNames: {
          base: ([
              // "border-1 border-purple-600 bg-pink-950"
          ])
        },
      });
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        defaultOpen={true}
        backdrop="blur"
        hideCloseButton
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50",
          base: "rounded-sm border-1 border-[#292f46] border-purple-600 bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Input
              variant="underlined"
              size="lg"
              className="font-bold text-large "
              isRequired
              errorMessage="Please enter a valid email"
              label="email"
              labelPlacement="inside"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
            ></Input>
            <Input
              variant="underlined"
              isRequired
              size="lg"
              className="font-bold"
              errorMessage="Please enter a valid password"
              label="password"
              labelPlacement="inside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
            ></Input>
            <div className="flex flex-col my-4 w-full">
              <Button
                className="rounded-sm border-1
                 border-purple-600 bg-transparent w-full"
                size="lg"
                type="submit"
                onPress={handleLoginSubmit}
              >
                Sign in
              </Button>
              <div className="my-4 flex justify-end">
                <Link className="" href="#" size="sm">
                  Forgot password?
                </Link>
                
              </div>
              <div className="flex justify-center">
              <Link href="/auth/register">
                  Go to register page
                </Link>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
