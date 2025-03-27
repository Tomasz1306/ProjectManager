"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Dispatch, Key, SyntheticEvent, useEffect, useState } from "react";
import React from "react";
import { Chip } from "@heroui/chip";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab } from "@heroui/tabs";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { HighPriorityIcon, IconWrapper } from "@/components/myicons";
import { MyTableConponent } from "@/components/table/MyTableIssueComponent";

interface Person {
  id: number;
  name: string;
  username: string;
  email: string;
  emailVerified: Date;
  image: string;
  createDate: Date;
  role: string;
  projectRole: string;
}

interface Issue {
  id: number;
  name: string;
  description: string;
  createDate: string;
  dueDate: string;
  status: string;
  priority: string;
  type: string;
}

interface Project {
  name: string;
  description: string;
  createDate: Date;
  status: string;
  creatorid: number;
}

interface CompleteProject {
  person: Person;
  project: Project;
}

interface IssueResponse {
  issues: Issue[];
}

interface Valid {
  valid: boolean;
}

interface ProjectLog {
  id: number;
  description: string;
  projectlogdate: Date;
}

interface ProjectLogResponse {
  projectLogs: ProjectLog[];
}

interface ProjectPerson {
  personid: Person;
  role: string;
  positions: Position[];
}

interface Position {
  id: number;
  personid: number;
  projectid: number;
  name: string;
}

interface PeopleResponse {
  people: ProjectPerson[];
  positions: Position[];
}

interface AddPersonResponse {
  status: boolean;
  person: ProjectPerson;
}

interface DeleteResponse {
  status: boolean;
  person: Person;
}

export default function ProjectPage(projectId: number) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useSearchParams();
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [creator, setCreator] = useState<Person>();
  const [selectedIssue, setSeletedIssue] = useState<Issue>();
  const [people, setPeople] = useState<ProjectPerson[]>([]);
  const [projectLogs, setProjectLogs] = useState<ProjectLog[]>([]);
  const [searchPeople, setSearchPeople] = useState("");
  const [findedPeople, setFindedPeople] = useState<Person[]>([]);
  const [selectedPersonToAdd, setSelectedPersonToAdd] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState(new Set([""]));
  const [selectedPerson, setSeletedPerson] = useState<ProjectPerson>();

  function handleSelectedPerson(keys: React.Key[]) {
    console.log("HALO");
    console.log(keys);
    setSelectedPersonId(new Set(keys));
    setSeletedPerson(people.find((person) => person.personid.id === Number(keys.keys().next().value)));
  }

  function handleSelectedPersonToAdd(key: Key | null) {
    if (key !== null) {
      setSelectedPersonToAdd(key.toString());
    }
  }

  async function addPersonToProject() {
    if (selectedPersonToAdd.length === 0) {
      return;
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/project/addPerson`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedPersonToAdd,
          projectId: params.get("projectId"),
        }),
      }
    );
    if (response.ok) {
      const jsonResponse: AddPersonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.status === true) {
        console.log(jsonResponse);
        setPeople([...people, jsonResponse.person]);
        setSearchPeople("");
      }
    }
  }

  async function deletePersonFromProject(personId: number) {
    const response = await fetch(
      `http://localhost:8080/api/v1/project/deletePerson`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deleteCallerEmail: localStorage.getItem("email"),
          projectId: params.get("projectId"),
          personId: personId,
        }),
      }
    );
    if (response.ok) {
      const jsonResponse: DeleteResponse = await response.json();
      if (jsonResponse.status) {
        setPeople(people.filter((person) => person.personid.id !== personId));
      }
    }
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
    if (searchPeople.length === 0) {
      setFindedPeople(Array());
      return;
    }
    async function fetchSearchingPeople() {
      const response = await fetch(`http://localhost:8080/api/v1/findPerson`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: searchPeople }),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setFindedPeople(jsonResponse);
      }
    }
    fetchSearchingPeople();
  }, [searchPeople]);

  useEffect(() => {
    async function fetchProjectLogs() {
      const response = await fetch(
        `http://localhost:8080/api/v1/projectLogs/${params.get("projectId")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const jsonResponse: ProjectLogResponse = await response.json();
        console.log(jsonResponse);
        setProjectLogs(jsonResponse.projectLogs);
      }
    }
    fetchProjectLogs();
  }, []);

  useEffect(() => {
    async function fetchPeople() {
      const response = await fetch(
        `http://localhost:8080/api/v1/projectPeople/${params.get("projectId")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const jsonResponse: PeopleResponse = await response.json();
        console.log(jsonResponse)
        const people = jsonResponse.people;
        console.log("PEOPLE: ", people);

        const positions = jsonResponse.positions;
        console.log("POSITIONS: ", positions);
        for (let i = 0; i < people.length; i++) {
          people[i].positions = [];
          for (let j = 0; j < positions.length; j++) {
            if (people[i].personid.id === positions[j].personid) {
              people[i]?.positions.push(positions[j]);
              console.log("APPEND");
            }
          }
        }
        console.log("HALO: ", people);
        setPeople(people);
      }
    }
    fetchPeople();
  }, []);

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch(
        `http://localhost:8080/api/v1/completeProject/${params.get("projectId")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const jsonResponse: CompleteProject = await response.json();
        console.log(jsonResponse);
        setCurrentProject(jsonResponse.project);
        setCreator(jsonResponse.person);
      }
    }

    fetchProject();
  }, []);

  useEffect(() => {
    async function fetchProjectIssues() {
      const response = await fetch(
        `http://localhost:8080/api/v1/projectIssues/${params.get("projectId")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const jsonResponse: IssueResponse = await response.json();
        setIssues(jsonResponse.issues);
        console.log(jsonResponse);
      }
    }
    fetchProjectIssues();
  }, []);

  return (
    <div>
      <Modal
        size="2xl"
        className="h-[200px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="flex justify-center">
                <ModalHeader>
                  <p className="text-lg">Add Person</p>
                </ModalHeader>
              </div>
              <ModalBody>
                <Autocomplete
                  label="Find by email"
                  radius="none"
                  className=" border-1 bg-transparent "
                  defaultItems={findedPeople}
                  inputValue={searchPeople}
                  onSelectionChange={(e) => handleSelectedPersonToAdd(e)}
                  onInputChange={(e) => setSearchPeople(e)}
                >
                  {(person) => (
                    <AutocompleteItem
                      className="rounded-none border-1 border-white/50"
                      variant="light"
                      key={person.email}
                      textValue={person.email}
                      // textValue={person.name}
                    >
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                          <div>
                            <Avatar></Avatar>
                          </div>
                          <div>
                            <p> {person.name}</p>
                            <p> {person.email}</p>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Button onPress={() => addPersonToProject()}>ADD</Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full border-1 dark:bg-gray-950">
        <div className="w-full flex flex-col justify-center">
          <Tabs
            aria-label="Project"
            radius="none"
            variant="underlined"
            size="lg"
            className="my-2 flex justify-center"
            color="secondary"
          >
            <Tab title="Overview">
              <p className="text-small text-default-500 mx-3">Project name</p>
              <p className="text-3xl1 mx-3">{currentProject?.name}</p>
              <Card
                key="Overview"
                title="Overview"
                className="bg-transparent my-2"
                radius="none"
              >
                <CardBody>
                  <div className=" flex flex-row">
                    <div className="basis-1/3">
                      <p className="text-small text-default-500">
                        Creator info
                      </p>
                      <div className="flex flex-row justify-start gap-3 my-2">
                        <EmailOutlinedIcon />
                        <p>{creator?.email}</p>
                      </div>
                      <div className="flex flex-row justify-start gap-3 my-2">
                        <LocalPhoneOutlinedIcon />
                        <p>664 334 443</p>
                      </div>
                      <div className="flex flex-row justify-start gap-3">
                        <CalendarMonthOutlinedIcon />
                        <p>Create date:</p>
                      </div>
                    </div>
                    <div className="flex basis-1/3 justify-start">
                      <div>
                        <p className="">Status: </p>
                      </div>
                    </div>
                    <div className="basis-1/3">
                      <p>{projectLogs?.length}</p>
                      {projectLogs?.map((projectLog) => (
                        <div key={projectLog.id}>
                          <p key={projectLog.id}>{projectLog.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Divider className="my-2"></Divider>
                  <div className="flex flex-row">
                    <div className="w-[40%]">
                      <div className="flex justify-start">
                        <p className="text-2xl">People</p>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-[90%]">
                          <Button
                            variant="light"
                            radius="none"
                            color="success"
                            size="lg"
                            className="w-full border-1 border-green-400 "
                            onPress={onOpen}
                          >
                            ADD
                          </Button>
                        </div>
                      </div>

                      <Listbox
                        // classNames={{
                        //   base: "max-w-xs",
                        //   list: "max-h-[300px] overflow-scroll",
                        // }}
                        className="w-full max-h-[150px] my-2 overflow-scroll"
                        items={people}
                        selectionMode="single"
                        aria-label="peopleList"
                        selectedKeys={selectedPersonId}
                        onSelectionChange={(keys: React.Key[]) =>
                          handleSelectedPerson(keys)
                        }
                      >
                        {(person) => (
                          <ListboxItem
                            key={person.personid.id}
                            className=" rounded-sm"
                            textValue={person.personid.name}
                            aria-label={person.personid.name}
                          >
                            <div className="flex flex-row items-center gap-4 justify-between">
                              <div className="w-full flex flex-row gap-2 justify-between">
                                <div className="basis-[10%]">
                                  <Avatar></Avatar>
                                </div>

                                <div className="basis-[60%] flex flex-col justify-center">
                                  {person.personid.name.length >= 16 && (
                                    <div>
                                      <p className="text-lg">
                                        {person.personid.name.slice(0, 16)}...
                                      </p>
                                      <p className="text-white/50">
                                        {person.personid.email}
                                      </p>
                                    </div>
                                  )}
                                  {person.personid.name.length < 18 && (
                                    <div>
                                      <p className="text-lg">
                                        {person.personid.name}
                                      </p>
                                      <p className="text-white/50">
                                        {person.personid.email}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="basis-[30%] flex flex-col justify-center">
                                  {person.role === "MEMBER" && (
                                    <div className="">
                                      <Chip variant="light" color="success">
                                        <p className="text-lg">MEMBER</p>
                                      </Chip>
                                    </div>
                                  )}
                                  {person.role === "ADMIN" && (
                                    <div>
                                      <Chip variant="light" color="warning">
                                        <p className="text-lg">ADMIN</p>
                                      </Chip>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {person.role === "MEMBER" && (
                                <div className="flex justify-end">
                                  <Button
                                    variant="light"
                                    color="danger"
                                    radius="none"
                                    className="border-1"
                                    key={person.personid.id}
                                    onPress={(e) =>
                                      deletePersonFromProject(
                                        person.personid.id
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                              {person.role === "ADMIN" && (
                                <div className="flex justify-end">
                                  <Button
                                    variant="light"
                                    color="danger"
                                    radius="none"
                                    className="border-1"
                                    isDisabled
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          </ListboxItem>
                        )}
                      </Listbox>
                    </div>

                    <div className="w-[60%] border-1">
                      {selectedPerson && 
                        <div>
                          <p>{selectedPerson.personid.name}</p>
                          <p>{selectedPerson.personid.email}</p>
                          <p>{selectedPerson.role}</p>
                          {selectedPerson?.positions.map((position) => (
                            <div key={position.id}>
                                <Button key={position.id}>{position.name}</Button>
                              </div>
                          ))}
                        </div>
                        }
                    </div>
                  </div>

                  <Divider className="my-2"></Divider>
                  <div className="">
                    <p className="text-lg">Issues: 15/20</p>
                    <p className="text-lg">Issues Delayed: 15/20</p>
                    <p className="text-lg">Budget: 75 000$</p>
                    <p className="text-lg">Time left: 300h</p>
                    <p className="text-lg">Time spent: 40h</p>
                    <p className="text-lg">
                      Last activity: Issue 4 changed to completed
                    </p>
                    <p className="text-lg">Meetings soon</p>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab title="Issues" className="rounded-sm ">
              <Card className="bg-transparent rounded-sm">
                <CardBody className="bg-transparent">
                  <MyTableConponent issuesProps={issues}></MyTableConponent>
                </CardBody>
              </Card>
            </Tab>
            <Tab title="Statistics">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
            <Tab title="Board">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
            <Tab title="Meetings">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
            <Tab title="Discussion">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
            <Tab title="Documentation">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
