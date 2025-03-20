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
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

interface Credential {
  email: string;
  password: string;
}

interface Person {
  email: string;
  name: string;
  surname: string;
  id: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        defaultOpen={true}
        backdrop="blur"
        size="5xl"
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
          <ModalHeader>
            <div className="w-full flex justify-center">
              <p className="text-white underline">CREATE NEW PROJECT</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-4">
                <Input
                  variant="bordered"
                  radius="none"
                  className="bg-transparent"
                  placeholder="Project name"
                  type="text"
                  label="project name"
                  color="secondary"
                  size="lg"
                ></Input>
                <Textarea
                  className="text-2xl"
                  color="secondary"
                  size="lg"
                  radius="none"
                  variant="bordered"
                  label="Description"
                  placeholder="Description"
                ></Textarea>
                <Accordion>
                  <AccordionItem key={1} title="Mile stones">
                    <div className="flex justify-center gap-4">
                      <Input size="lg" variant="bordered" radius="none" color="secondary" className=" rounded-sm border-purple-500"></Input>
                      <Button size="lg" className="rounded-sm border-1 border-purple-500" variant="light">Add new mile stone</Button>
                    </div> 
                    
                  </AccordionItem>
                  <AccordionItem key={2} title="Technologies">

                  </AccordionItem>
                  <AccordionItem key={2} title="Add people" >
                    <Autocomplete label="Select persons" defaultItems={people}>
                      {people.map((person) => (
                        <AutocompleteItem key={person.id}>{person.name}</AutocompleteItem>
                      ))}
                      
                    </Autocomplete>
                  </AccordionItem>

                </Accordion>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col my-4 w-1/2">
                  <div className="flex flex-row gap-2 ">
                    <Button
                      className="rounded-sm border-1
                 border-green-600 bg-transparent w-full"
                      size="lg"
                      variant="light"
                      color="success"
                    >
                      Create
                    </Button>
                    <Button
                      className="rounded-sm border-1
                 border-pink-700 bg-transparent w-full"
                      size="lg"
                      variant="light"
                      color="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
