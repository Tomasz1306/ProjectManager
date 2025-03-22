"use client";
import type { Selection } from "@react-types/shared";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Progress } from "@heroui/progress";
import { PieChart } from "@mui/x-charts";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab } from "@heroui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Alert } from "@heroui/alert";
import { cn } from "@heroui/theme";
export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[400px] border-1 px-1 py-2 rounded-sm border-violet-600 ">
    {children}
  </div>
);

interface Person {
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

export default function ProjectPage(projectId: number) {
  const params = useSearchParams();
  // console.log(params.get("projectId"));
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [users, setUsers] = useState<Person[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [creator, setCreator] = useState<Person>();
  const [projectIssues, setProjectIssues] = useState<Issue[]>([]);
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
        // setProjectIssues(jsonResponse.)
      }
    }

    fetchProject();
  }, []);

  useEffect(() => {
    async function fetchProjectIssues() {
      const response = await fetch(`http://localhost:8080/api/v1/projectIssues/${params.get("projectId")}`,{
        method: "GET",
        headers: {
          "Authorization": "Bearer" + localStorage.getItem("token"),
        }
      });
      if (response.ok) {
        const jsonResponse: IssueResponse = await response.json();
        setIssues(jsonResponse.issues);
        console.log(jsonResponse);
      }
    }
    fetchProjectIssues();
  }, [])

  useEffect(() => {
    async function fetchProjectCreator() {
      const response = await fetch(
        `http://localhost:8080/api/v1/person/${currentProject?.creatorid}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setCreator(jsonResponse);
      }
    }
    fetchProjectCreator();
  }, [setCurrentProject]);
  return (
    <div className="w-full  border-1 dark:bg-stone-800">
      <div className="w-full flex flex-col justify-center">
        <Tabs
          aria-label="Project"
          radius="none"
          variant="underlined"
          size="lg"
          className=" border-purple-600 my-2 flex justify-center "
          color="secondary"
        >
          <Tab title="Overview">
            <p className="text-small text-default-500 mx-3">Project name</p>
            <p className="text-4xl mx-3">{currentProject?.name}</p>
            <Card key="Overview" title="Overview" className="bg-transparent my-2" radius="none">
              <CardBody>
                <div className=" flex flex-row">
                  <div className="basis-1/3">
                    <p className="text-small text-default-500">Creator info</p>
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
                    <p>Last actions</p>
                    <Listbox className="h-[150px]" variant="light">
                      <ListboxItem>
                        <p>Finished task nr 234</p>
                      </ListboxItem>
                      <ListboxItem>
                        <p>Finished task nr 34</p>
                      </ListboxItem>
                      <ListboxItem>
                        <p>Finished task nr 224</p>
                      </ListboxItem>
                      <ListboxItem>
                        <p>Finished task nr 456</p>
                      </ListboxItem>
                      <ListboxItem>
                        <p>Finished task nr 12</p>
                      </ListboxItem>
                      <ListboxItem>
                        <p>Finished task nr 43</p>
                      </ListboxItem>
                    </Listbox>
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
          <Tab title="Backlog">
            <Card>
              <CardBody>
                {/* <Listbox>

                </Listbox> */}
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
          <Tab title="Meatings">
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

    // <div className="w-full flex justify-center ">
    //   <div className="flex bg-zinc-950 w-[100%] justify-center">
    //     <div className="flex flex-col my-24 w-[100%]">
    //       <Card
    //         className="w-full rounded-sm border-1
    //       border-violet-800 bg-neutral-900"
    //       >
    //         <CardBody>
    //           <div className="flex flex-row w-full">
    //             <div className="basis-1/3 w-1/3 flex flex-col">
    //               <p className="text-3xl">Nazwa projektu</p>
    //               <p className="text-2xl my-4">Opis projektu</p>
    //               <p className="text-lg my-1">Identyfikator i slowa kluczowe</p>
    //             </div>
    //             <div className="basis-1/3 w-1/3 text-white">
    //               <div className="flex flex-col gap-4">
    //                 <PieChart
    //                   className="pieChartCustom text-white fill-current"
    //                   sx={{
    //                     "& text": {
    //                       fill: "#00FF00",
    //                     },
    //                   }}
    //                   series={[
    //                     {
    //                       data: [
    //                         {
    //                           id: 0,
    //                           value: 10,
    //                           label: "TODO",
    //                           color: "#616161",
    //                         },
    //                         {
    //                           id: 1,
    //                           value: 15,
    //                           label: "In progress",
    //                           color: "#673ab7",
    //                         },
    //                         {
    //                           id: 2,
    //                           value: 20,
    //                           label: "Completed",
    //                           color: "#4caf50",
    //                         },
    //                       ],
    //                     },
    //                   ]}
    //                   width={400}
    //                   height={200}
    //                 />

    //                 <div>
    //                   <Progress
    //                     label="Developers Issues"
    //                     classNames={{
    //                       base: "max-w-md",
    //                       track: "drop-shadow-md border border-default",
    //                       indicator:
    //                         "bg-gradient-to-r from-white to-violet-500",
    //                       label: "tracking-wider font-medium text-default-600",
    //                       value: "text-foreground/60",
    //                     }}
    //                     color="success"
    //                     showValueLabel={true}
    //                     size="sm"
    //                     value={progressDeveloperIssues}
    //                   />
    //                   <Progress
    //                     label="Analisys Issues"
    //                     classNames={{
    //                       base: "max-w-md",
    //                       track: "drop-shadow-md border border-default",
    //                       indicator: "bg-gradient-to-r from-white to-blue-500",
    //                       label: "tracking-wider font-medium text-default-600",
    //                       value: "text-foreground/60",
    //                     }}
    //                     color="success"
    //                     showValueLabel={true}
    //                     size="sm"
    //                     value={progressAnalisysIssues}
    //                   />
    //                   <Progress
    //                     label="Code review Issues"
    //                     classNames={{
    //                       base: "max-w-md",
    //                       track: "drop-shadow-md border border-default",
    //                       indicator:
    //                         "bg-gradient-to-r from-white to-orange-500",
    //                       label: "tracking-wider font-medium text-default-600",
    //                       value: "text-foreground/60",
    //                     }}
    //                     color="success"
    //                     showValueLabel={true}
    //                     size="sm"
    //                     value={progressCodeReviewIssues}
    //                   />
    //                   <Progress
    //                     label="Testers Issues"
    //                     classNames={{
    //                       base: "max-w-md",
    //                       track: "drop-shadow-md border border-default",
    //                       indicator:
    //                         "bg-gradient-to-r from-white to-yellow-400",
    //                       label: "tracking-wider font-medium text-default-600",
    //                       value: "text-foreground/60",
    //                     }}
    //                     color="success"
    //                     showValueLabel={true}
    //                     size="sm"
    //                     value={progressTesterIssues}
    //                   />
    //                   <Progress
    //                     label="Completed Issues"
    //                     classNames={{
    //                       base: "max-w-md",
    //                       track: "drop-shadow-md border border-default",
    //                       indicator: "bg-gradient-to-r from-white to-green-400",
    //                       label: "",
    //                       value: "text-foreground/60",
    //                     }}
    //                     color="success"
    //                     showValueLabel={true}
    //                     size="sm"
    //                     value={progressCompletedIssues}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="flex flex-row w-full">
    //             <div className="basis-1/3 w-1/3">
    //               <ListboxWrapper>
    //                 <Listbox
    //                   classNames={{
    //                     base: "max-w-lg",
    //                     list: "max-h-[400px] w-full overflow-scroll",
    //                   }}
    //                   defaultSelectedKeys={["1"]}
    //                   items={users}
    //                   label="Assigned to"
    //                   selectionMode="single"
    //                   //   topContent={}
    //                   variant="flat"
    //                   onSelectionChange={setSelectedUser}
    //                 >
    //                   {(item) => (
    //                     <ListboxItem key={item.id} textValue={item.name}>
    //                       <div className="flex gap-2 items-center">
    //                         <Avatar
    //                           key={item.id}
    //                           alt={item.name}
    //                           className="flex-shrink-0"
    //                           size="sm"
    //                           src={item.image}
    //                         />
    //                         <div key={item.id} className="flex flex-col">
    //                           <span className="text-small">{item.name}</span>
    //                           <span className="text-tiny text-default-400">
    //                             {item.email}
    //                           </span>
    //                         </div>
    //                       </div>
    //                     </ListboxItem>
    //                   )}
    //                 </Listbox>
    //               </ListboxWrapper>
    //             </div>
    //             <div className="w-1/3">
    //               <p>Role</p>
    //               <Chip
    //                 className="bg-violet-600 my-2"
    //                 size="lg"
    //                 variant="shadow"
    //               >
    //                 <p>Developer</p>
    //               </Chip>
    //               <p className="my-2">Issues</p>
    //               <Progress
    //                 aria-label="Downloading..."
    //                 className="max-w-md"
    //                 color="success"
    //                 showValueLabel={true}
    //                 size="md"
    //                 value={progressUserIssues}
    //               />
    //               <div className="my-2">
    //                 <ListboxWrapper>
    //                   <Listbox
    //                     classNames={{
    //                       base: "max-w-lg",
    //                       list: "max-h-[150px] w-full overflow-scroll",
    //                     }}
    //                     defaultSelectedKeys={["1"]}
    //                     items={issues}
    //                     label="Assigned to"
    //                     selectionMode="single"
    //                     //   topContent={}
    //                     variant="flat"
    //                     onSelectionChange={setSelectedUserIssue}
    //                   >
    //                     {(item) => (
    //                       <ListboxItem key={item.id} textValue={item.name}>
    //                         <div
    //                           key={item.id}
    //                           className="flex gap-2 items-center"
    //                         >
    //                           <div key={item.id} className="flex flex-col">
    //                             <span className="text-small">{item.name}</span>
    //                             <span className="text-tiny text-default-400">
    //                               {item.name}
    //                             </span>
    //                           </div>
    //                         </div>
    //                       </ListboxItem>
    //                     )}
    //                   </Listbox>
    //                 </ListboxWrapper>
    //               </div>
    //             </div>
    //             <div className="w-1/3"></div>
    //           </div>
    //         </CardBody>
    //         <CardFooter></CardFooter>
    //       </Card>
    //       <Card className="w-[90%] mt-4">
    //         <CardHeader>
    //           <h1>Projekt</h1>
    //         </CardHeader>
    //         <CardBody></CardBody>
    //         <CardFooter></CardFooter>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
  );
}
