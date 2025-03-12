"use client";
import type { Selection } from "@react-types/shared";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import CustomizedTimeline from "@/components/timeline";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { useMemo, useState } from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import React from "react";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Progress } from "@heroui/progress";
import { CircularProgress } from "@heroui/progress";
import { PieChart } from "@mui/x-charts";

export const issues = [
  {
    id: 1,
    topic: "Issue 1",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
  {
    id: 2,
    topic: "Issue 2",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
  {
    id: 3,
    topic: "Issue 3",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
  {
    id: 4,
    topic: "Issue 4",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
  {
    id: 5,
    topic: "Issue 5",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
  {
    id: 6,
    topic: "Issue 6",
    description: "CEO",
    project: "Management",
    status: "active",
    startDate: "29",
    assigner: "Tomasz Bogdan",
  },
];

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
    email: "mia.robinson@example.com",
  },
];

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[400px] border-1 px-1 py-2 rounded-sm border-violet-600 ">
    {children}
  </div>
);

export default function () {
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
                              src={item.avatar}
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
                          <ListboxItem key={item.id} textValue={item.topic}>
                            <div className="flex gap-2 items-center">
                              <div className="flex flex-col">
                                <span className="text-small">{item.topic}</span>
                                <span className="text-tiny text-default-400">
                                  {item.topic}
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
