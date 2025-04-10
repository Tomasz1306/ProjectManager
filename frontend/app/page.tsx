"use client";
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
import { useRouter } from "next/navigation";
import { createNewProjectModal } from "@/components/createNewProjectModal";
import { Link } from "@heroui/link";

interface Position {
  id: number;
  name: string;
}

interface Valid {
  valid: boolean;
}

export default function Home() {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [isUpdateInformation, setIsUpdateInformation] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handlePressedPositionButton = (position: number) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter((pos) => pos !== position));
    } else {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  function handleCreateNewProjectButton() {
    router.push("/projects/create");
  }

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/checkToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            token: localStorage.getItem("token"),
          }),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            const jsonBody: Valid = await response.json();
            if (jsonBody.valid) {
              setIsValidToken(true);
              setIsUpdateInformation(true);
            } else {
              router.push("/auth/login");
            }
          } else {
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          console.log("halo");
          console.log("error");
          router.push("/auth/login");
        });
    }
    checkToken();
  }, []);

  useEffect(() => {
    if (isValidToken) {
      const fetchPositions = async () => {
        console.log(localStorage.getItem("token"));
        const headers = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        console.log(headers);
        const response = await fetch("http://localhost:8080/api/v1/positions", {
          method: "GET",
          headers,
        })
          .then(async (response) => {
            const jsonResponse = await response.json();
            setPositions(jsonResponse);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchPositions();
    }
  }, [isUpdateInformation]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className=" rounded-sm dark:bg-slate-900"
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
                      >
                        Password
                      </Input>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <p>Select your roles</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center my-2">
                      {positions.map((position) => {
                        return (
                          <div className="" key={position.id}>
                            <Button
                              onPress={() =>
                                handlePressedPositionButton(position.id)
                              }
                              variant="bordered"
                              className={`border-2 border-violet-400 rounded-sm ${selectedPositions.includes(position.id) ? "bg-violet-950" : "bg-transparent"}`}
                              size="lg"
                              color="default"
                              key={position.id}
                            >
                              {position.name}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-row justify-center">
                <Button
                  color="success"
                  variant="light"
                  className="rounded-sm border-1 border-green-500"
                  onPress={onClose}
                >
                  Save
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  className="rounded-sm border-1 border-pink-800"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] flex flex-col my-20">
          <Card className=" rounded-sm">
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
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full rounded-sm border-1 
                  border-purple-600 bg-transparent"
                      onPress={onOpen}
                    >
                      Update information
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="flex flex-row justify-between ">
            <Card className="w-full rounded-sm my-1">
              <CardBody>
                <div className="flex flex-row">
                  <div className="basis-1/3">
                    <p className="text-2xl">Issues</p>
                  </div>
                  <div className="basis-1/3"></div>
                  <div className="basis-1/3 flex flex-col justify-center">
                    <div className="flex justify-center">
                      <p className="text-3xl">Projects</p>
                    </div>
                    <div className="flex justify-center my-4">
                      <Button
                        variant="light"
                        className=" bg-purple-800/50 border-purple-500/70
                      border-1 rounded-sm"
                        as={Link}
                        href="/projects"
                      >
                        <p className="text-lg">Projects</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
