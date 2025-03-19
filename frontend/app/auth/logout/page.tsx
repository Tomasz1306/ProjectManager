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
import { Button, PressEvent } from "@heroui/button";
import { Link } from "@heroui/link";


export default function LogoutPage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  async function handleLogout(e: PressEvent) {
    const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"email": localStorage.getItem("email"), "token": localStorage.getItem("token")})
    });
    if (response.ok) {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      router.push("login");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      router.push("login")
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
          backdrop: "bg-[#292f46]/50",
          base: "rounded-sm border-1 border-[#292f46] border-purple-600 bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex justify-center">
            <p>Are you sure, you want to log out?</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row w-full justify-center gap-4">
              <Button
                color="success"
                variant="light"
                size="lg"
                className="rounded-sm border-1 border-green-500 w-1/2"  
                onPress={handleLogout}
              >
                Yes
              </Button>
              <Button
                className="rounded-sm border-1 w-1/2
                 border-pink-800"
                size="lg"
                variant="light"
                type="submit"
                color="danger"
              >
                No
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
