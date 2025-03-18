"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, PressEvent } from "@heroui/button";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";

export default function Home() {
  const [isUpdateInformation, setIsUpdateInformation] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleUpdateInformation(e: PressEvent) {}


  useEffect(() => {
    
  }, [])

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className=" rounded-sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 justify-center">
                <p>Information</p>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 justify-center">
                  <div className=" flex gap-4 justify-center">
                    <div className="w-[50%] flex flex-col justify-center gap-5">
                      <Input
                        variant="bordered"
                        radius="none"
                        className="bg-transparent"
                        color="secondary"
                        size="lg"
                        placeholder="Name"
                        label="Name"
                      >
                        Name
                      </Input>
                      <Input
                        variant="bordered"
                        radius="none"
                        className="bg-transparent"
                        placeholder="Surname"
                        label="Surname"
                        color="secondary"
                        size="lg"
                      >
                        Surname
                      </Input>
                      <Input
                        variant="bordered"
                        radius="none"
                        className="bg-transparent"
                        placeholder="Email"
                        label="Email"
                        type="email"
                        color="secondary"
                        size="lg"
                      >
                        Email
                      </Input>
                      <Input
                        variant="bordered"
                        radius="none"
                        className="bg-transparent"
                        placeholder="Password"
                        type="password"
                        label="Password"
                        color="secondary"
                        size="lg"
                      >Password</Input>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <p>Select your roles</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-center">
                <Button color="success" variant="light" className="rounded-sm border-1 border-green-500" onPress={onClose}>
                  Save
                </Button>
                <Button color="danger" variant="light" className="rounded-sm border-1 border-pink-800" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] flex flex-col my-20">
          <Card
            className=" rounded-sm 
        border-1 border-fuchsia-700"
          >
            <CardBody>
              <div className="flex flex-row gap-4">
                <div className="w-1/3">
                  <div className="flex flex-row gap-4">
                    <div>
                      <Avatar size="lg"></Avatar>
                    </div>

                    <div>
                      <p className="text-large">Tomasz Bogdan</p>
                      <p className="text-sm">tomasz2@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 "></div>
                <div className="flex w-1/3 justify-end">
                  <Button
                    className="w-full rounded-sm border-1 
                  border-purple-600 bg-transparent"
                    onPress={onOpen}
                  >
                    Update information
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="flex flex-row justify-between my-6">
            <Card className="w-[49%] rounded-sm border-1 border-fuchsia-600">
              <CardHeader>
                <p>Issues</p>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card className="w-[49%] rounded-sm border-1 border-fuchsia-600">
              <CardHeader>
                <p>Projects</p>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
