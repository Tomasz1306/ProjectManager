"use client";
import { redirect } from "next/navigation";
import { LoginModal } from "@/components/login-modal";
import { useAuthContext } from "@/components/context/AuthContext";
import { FormEvent, useContext, useEffect } from "react";
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
import { ClientLogin } from "@/components/Actions";


export default function signInPage() {
  const { authInfo, setAuthInfo } = useAuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await ClientLogin(formData);
    if (response === null) {

    } else {
      console.log(response);
      setAuthInfo(response);
      redirect ("/");
    }
  };

  useEffect(() => {
    console.log("HALO");
    if (
      authInfo.token.length === 0 &&
      // authInfo.username.length === 0 &&
      authInfo.email.length === 0 &&
      authInfo.password.length === 0
    ) {
      console.log("WITAM");
    } else {
      console.log("halo");
      const fetchAuth = async () => {
        const response = await fetch(
          "http://localhost:8080/auth/v1/authenticate",
          {
            method: "POST",
            body: JSON.stringify({
              email: authInfo.email,
              password: authInfo.password,
            }),
          }
        );
        if (response.ok) {
          redirect ("/");
        }
      };
      fetchAuth();
    }
  }, [setAuthInfo]);

  return (
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
          <Form className="" onSubmit={handleLoginSubmit}>
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
            ></Input>
            <div className="flex flex-col my-4 w-full">
              <Button
                className="rounded-sm border-1
                 border-purple-600 bg-transparent w-full"
                size="lg"
                type="submit"
              >
                Sign in
              </Button>
              {/* <Button
                className="rounded-sm border-1
                 border-purple-600 bg-transparent"
                size="lg"
                type="reset"
              >
                Reset
              </Button> */}
              <div className="my-4 flex justify-end">
                <Link className="" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
