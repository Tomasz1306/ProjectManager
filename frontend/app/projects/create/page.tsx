"use client";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
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

import {
  ProjectCreateRequestDTO,
  ProjectCreateResponseDTO,
  User,
  UserFindByEmailKeyResponseDTO,
  UserFindByEmailKeyRequestDTO,
} from "@/types/types"

export default function LoginPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<User[]>([]);
  const [projectStatus, setProjectStatus] = useState('IN PROGRESS');
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  async function handleCreateProject() {
    const projectCreateRequestDTO: ProjectCreateRequestDTO = {
      creatorId: Number(localStorage.getItem("id")),
      name: projectName,
      description: projectDescription,
    }
    const response = await fetch("http://localhost:8080/api/v1/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(projectCreateRequestDTO),
    });

    if (response.ok) {
      const jsonResponse: ProjectCreateResponseDTO = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.status) {
        addToast({
          title: "SUCCESS",
          description: "The project was successful created",
          color: "success",
          radius: "none",
        });
        router.push("/projects");
      }
    }
  }

  const handleProjectNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleProjectDescriptionInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setProjectDescription(event.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setPeople([]);
      return;
    }
    const fetchPeople = async () => {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ key: search }),
      });
      if (response.ok) {
        const userFindByEmailKeyResponse = await response.json();
        console.log(userFindByEmailKeyResponse.users);
        setPeople(userFindByEmailKeyResponse.users);
      }
    };
    fetchPeople();
  }, [search]);

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
                  value={projectName}
                  onChange={handleProjectNameInput}
                ></Input>
                <Textarea
                  className="text-2xl"
                  color="secondary"
                  size="lg"
                  radius="none"
                  variant="bordered"
                  label="Description"
                  placeholder="Description"
                  value={projectDescription}
                  onChange={handleProjectDescriptionInput}
                ></Textarea>
                <Accordion>
                  <AccordionItem key={1} title="Mile stones">
                    <div className="flex justify-center gap-4">
                      <Input
                        size="lg"
                        variant="bordered"
                        radius="none"
                        color="secondary"
                        className=" rounded-sm border-purple-500"
                      ></Input>
                      <Button
                        size="lg"
                        className="rounded-sm border-1 border-purple-500"
                        variant="light"
                      >
                        Add new mile stone
                      </Button>
                    </div>
                  </AccordionItem>
                  <AccordionItem key={2} title="Technologies"></AccordionItem>
                  <AccordionItem key={3} title="Add people">
                    <Autocomplete
                      label="Find by email"
                      defaultItems={people}
                      inputValue={search}
                      onInputChange={(e) => setSearch(e)}
                    >
                      {people.map((person) => (
                        <AutocompleteItem key={person.id}>
                          {person.name}
                        </AutocompleteItem>
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
                      onPress={handleCreateProject}
                    >
                      Create
                    </Button>
                    <Button
                      className="rounded-sm border-1
                 border-pink-700 bg-transparent w-full"
                      size="lg"
                      variant="light"
                      color="danger"
                      as={Link}
                      href="/projects"
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
