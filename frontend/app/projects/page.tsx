"use client";
import type { Selection } from "@react-types/shared";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import CustomizedTimeline from "@/components/timeline";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Progress } from "@heroui/progress";
import { PieChart } from "@mui/x-charts";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[400px] border-1 px-1 py-2 rounded-sm border-violet-600 ">
    {children}
  </div>
);

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  emailVerified: Date;
  image: string;
  createDate: Date;
}

interface Issue {
  id: number;
  name: string;
  description: string;
  createDate: Date;
  dueDate: Date;
  status: string;
  priority: string;
  type: string;
}

export default function () {
  const [users, setUsers] = useState<User[]>([]);
  const addUsers = () => {
    const newUsers: User[] = [
      {
        id: 1,
        name: 'Tomasz',
        username: 'Opis pierwszego zadania',
        email: "halo",
        emailVerified: new Date(),
        image: 'otwarte',
        createDate: new Date()
      },
      {
        id: 2,
        name: 'Bartek',
        username: 'okej',
        email: "halo",
        emailVerified: new Date(),
        image: 'otwarte',
        createDate: new Date()
      }
    ];
    setUsers(prev => [...prev, ...newUsers]);
  };
  

  
  const [issues, setIssues] = useState<Issue[]>([]);
  const addIssues = () => {
    const newIssues: Issue[] = [
      {
        id: 1,
        name: 'Pierwsze zadanie',
        description: 'Opis pierwszego zadania',
        createDate: new Date(),
        dueDate: new Date(),
        status: 'otwarte',
        priority: 'wysoki',
        type: 'bug'
      },
      {
        id: 2,
        name: 'Drugie zadanie',
        description: 'Opis drugiego zadania',
        createDate: new Date(),
        dueDate: new Date(),
        status: 'otwarte',
        priority: 'niski',
        type: 'feature'
      }
    ];
    setIssues(prev => [...prev, ...newIssues]);
  };
  
  const [selectedUser, setSelectedUser] = useState<Selection>(new Set(["1"]));
  const [selectedUserIssue, setSelectedUserIssue] = useState<Selection>(
    new Set(["1"])
  );
  const [progressUserIssues, setProgressUserIssues] = useState(20);
  const [progressProjectIssues, setProgressProjectIssues] = useState(80);
  const [progressDeveloperIssues, setProgressDeveloperIssues] = useState(20);
  const [progressTesterIssues, setProgressTesterIssues] = useState(20);
  const [progressCompletedIssues, setProgressCompletedIssues] = useState(20);
  const [progressCodeReviewIssues, setProgressCodeReviewIssues] = useState(20);
  const [progressAnalisysIssues, setProgressAnalisysIssues] = useState(20);

  useEffect(() => {
    addUsers();
    addIssues();
  },[])
  return (
    <div className="w-full flex justify-center ">
      <div className="flex bg-zinc-950 w-[100%] justify-center">
        <div className="flex flex-col my-24 w-[80%]">
          <Card
            className="w-[70%] rounded-sm border-1 
          border-violet-800 bg-neutral-900"
          >
            <CardHeader className="">
              <div className="flex flex-row w-full">
                <div className="basis-1/3 w-1/3 flex flex-col">
                  <p className="text-3xl">Nazwa projektu</p>
                  <p className="text-2xl my-4">Opis projektu</p>
                  <p className="text-lg my-1">Identyfikator i slowa kluczowe</p>
                </div>
                <div className="basis-1/3 w-1/3 text-white">
                  <div className="flex flex-col gap-4">
                    <PieChart
                      className="pieChartCustom text-white fill-current"
                      sx={{
                        "& text": {
                          fill: "#00FF00",
                        },
                      }}
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: 10,
                              label: "TODO",
                              color: "#616161",
                            },
                            {
                              id: 1,
                              value: 15,
                              label: "In progress",
                              color: "#673ab7",
                            },
                            {
                              id: 2,
                              value: 20,
                              label: "Completed",
                              color: "#4caf50",
                            },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />

                    <div>
                      <Progress
                        label="Developers Issues"
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-white to-violet-500",
                          label: "tracking-wider font-medium text-default-600",
                          value: "text-foreground/60",
                        }}
                        color="success"
                        showValueLabel={true}
                        size="sm"
                        value={progressDeveloperIssues}
                      />
                      <Progress
                        label="Analisys Issues"
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-white to-blue-500",
                          label: "tracking-wider font-medium text-default-600",
                          value: "text-foreground/60",
                        }}
                        color="success"
                        showValueLabel={true}
                        size="sm"
                        value={progressAnalisysIssues}
                      />
                      <Progress
                        label="Code review Issues"
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-white to-orange-500",
                          label: "tracking-wider font-medium text-default-600",
                          value: "text-foreground/60",
                        }}
                        color="success"
                        showValueLabel={true}
                        size="sm"
                        value={progressCodeReviewIssues}
                      />
                      <Progress
                        label="Testers Issues"
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-white to-yellow-400",
                          label: "tracking-wider font-medium text-default-600",
                          value: "text-foreground/60",
                        }}
                        color="success"
                        showValueLabel={true}
                        size="sm"
                        value={progressTesterIssues}
                      />
                      <Progress
                        label="Completed Issues"
                        classNames={{
                          base: "max-w-md",
                          track: "drop-shadow-md border border-default",
                          indicator:
                            "bg-gradient-to-r from-white to-green-400",
                          label: "",
                          value: "text-foreground/60",
                        }}
                        color="success"
                        showValueLabel={true}
                        size="sm"
                        value={progressCompletedIssues}
                      />
                    </div>
                  </div>
                </div>

                <div className="basis-1/3  w-1/3 flex h-full">
                  <CustomizedTimeline></CustomizedTimeline>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-row w-full">
                <div className="basis-1/3 w-1/3">
                  <ListboxWrapper>
                    <Listbox
                      classNames={{
                        base: "max-w-lg",
                        list: "max-h-[400px] w-full overflow-scroll",
                      }}
                      defaultSelectedKeys={["1"]}
                      items={users}
                      label="Assigned to"
                      selectionMode="single"
                      //   topContent={}
                      variant="flat"
                      onSelectionChange={setSelectedUser}
                    >
                      {(item) => (
                        <ListboxItem key={item.id} textValue={item.name}>
                          <div className="flex gap-2 items-center">
                            <Avatar
                              alt={item.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={item.image}
                            />
                            <div className="flex flex-col">
                              <span className="text-small">{item.name}</span>
                              <span className="text-tiny text-default-400">
                                {item.email}
                              </span>
                            </div>
                          </div>
                        </ListboxItem>
                      )}
                    </Listbox>
                  </ListboxWrapper>
                </div>
                <div className="w-1/3">
                  <p>Role</p>
                  <Chip
                    className="bg-violet-600 my-2"
                    size="lg"
                    variant="shadow"
                  >
                    <p>Developer</p>
                  </Chip>
                  <p className="my-2">Issues</p>
                  <Progress
                    aria-label="Downloading..."
                    className="max-w-md"
                    color="success"
                    showValueLabel={true}
                    size="md"
                    value={progressUserIssues}
                  />
                  <div className="my-2">
                    <ListboxWrapper>
                      <Listbox
                        classNames={{
                          base: "max-w-lg",
                          list: "max-h-[150px] w-full overflow-scroll",
                        }}
                        defaultSelectedKeys={["1"]}
                        items={issues}
                        label="Assigned to"
                        selectionMode="single"
                        //   topContent={}
                        variant="flat"
                        onSelectionChange={setSelectedUserIssue}
                      >
                        {(item) => (
                          <ListboxItem key={item.id} textValue={item.name}>
                            <div className="flex gap-2 items-center">
                              <div className="flex flex-col">
                                <span className="text-small">{item.name}</span>
                                <span className="text-tiny text-default-400">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </ListboxItem>
                        )}
                      </Listbox>
                    </ListboxWrapper>
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-[90%] mt-4">
            <CardHeader>
              <h1>Projekt</h1>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
