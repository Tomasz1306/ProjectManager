"use client";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { ClientLogin } from "./Actions";
import { Link } from "@heroui/link";

export const LoginModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });
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
          <Form className="" action={ClientLogin}>
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
};
