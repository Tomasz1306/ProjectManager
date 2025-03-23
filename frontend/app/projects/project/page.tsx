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
import { SharedSelection } from "@heroui/system";
export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[400px] border-1 px-1 py-2 rounded-sm border-violet-600 ">
    {children}
  </div>
);

export const BugIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.895,6.519l2.813-2.812l-1.414-1.414l-2.846,2.846c-0.233-0.166-0.473-0.321-0.723-0.454 c-1.723-0.91-3.726-0.911-5.45,0c-0.25,0.132-0.488,0.287-0.722,0.453L5.707,2.293L4.293,3.707l2.813,2.812 C6.53,7.242,6.08,8.079,5.756,9H2v2h2.307C4.242,11.495,4.2,11.997,4.2,12.5c0,0.507,0.042,1.013,0.107,1.511H2v2h2.753 c0.013,0.039,0.021,0.08,0.034,0.118c0.188,0.555,0.421,1.093,0.695,1.6c0.044,0.081,0.095,0.155,0.141,0.234l-2.33,2.33 l1.414,1.414l2.11-2.111c0.235,0.254,0.478,0.498,0.736,0.716c0.418,0.354,0.867,0.657,1.332,0.903 c0.479,0.253,0.982,0.449,1.496,0.58C10.911,21.931,11.455,22,12,22s1.089-0.069,1.618-0.204c0.514-0.131,1.017-0.327,1.496-0.58 c0.465-0.246,0.914-0.55,1.333-0.904c0.258-0.218,0.5-0.462,0.734-0.716l2.111,2.111l1.414-1.414l-2.33-2.33 c0.047-0.08,0.098-0.155,0.142-0.236c0.273-0.505,0.507-1.043,0.694-1.599c0.013-0.039,0.021-0.079,0.034-0.118H22v-2h-2.308 c0.065-0.499,0.107-1.004,0.107-1.511c0-0.503-0.042-1.005-0.106-1.5H22V9h-3.756C17.92,8.079,17.47,7.242,16.895,6.519z M8.681,7.748c0.445-0.558,0.96-0.993,1.528-1.294c1.141-0.603,2.442-0.602,3.581,0c0.569,0.301,1.084,0.736,1.53,1.295 c0.299,0.373,0.54,0.8,0.753,1.251H7.927C8.141,8.549,8.381,8.121,8.681,7.748z M17.8,12.5c0,0.522-0.042,1.044-0.126,1.553 c-0.079,0.49-0.199,0.973-0.355,1.436c-0.151,0.449-0.34,0.882-0.559,1.288c-0.217,0.399-0.463,0.772-0.733,1.11 c-0.267,0.333-0.56,0.636-0.869,0.898c-0.31,0.261-0.639,0.484-0.979,0.664s-0.695,0.317-1.057,0.41 c-0.04,0.01-0.082,0.014-0.122,0.023V14h-2v5.881c-0.04-0.009-0.082-0.013-0.122-0.023c-0.361-0.093-0.717-0.23-1.057-0.41 s-0.669-0.403-0.978-0.664c-0.311-0.263-0.604-0.565-0.871-0.899c-0.27-0.337-0.516-0.71-0.731-1.108 c-0.22-0.407-0.408-0.84-0.56-1.289c-0.156-0.463-0.276-0.946-0.356-1.438C6.242,13.544,6.2,13.022,6.2,12.5 c0-0.505,0.041-1.009,0.119-1.5h11.361C17.759,11.491,17.8,11.995,17.8,12.5z"
        fill="currentColor"
      />
    </svg>
  );
};

export const IconWrapper = ({ children, className }) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7"
    )}
  >
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
  const [backLogSelectedIssue, setBackLogSelectedIssue] = useState(
    new Set(["7"])
  );
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

  const handleSelectionBackLogSelectedIssue = (key: SharedSelection) => {
    const selectedKey = new Set<string>();
    if (typeof key === "string") {
      selectedKey.add(key);
    } else if (key.currentKey) {
      selectedKey.add(key.currentKey);
    }
    setBackLogSelectedIssue(selectedKey);
  };

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
            <Card
              key="Overview"
              title="Overview"
              className="bg-transparent my-2"
              radius="none"
            >
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
                <Listbox
                  className="p-0 gap-4 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-sm"
                  itemClasses={{
                    base: "px-5 rounded-none my-1 h-16 data-[hover=true]:bg-default-100/80 ",
                  }}
                  items={issues}
                  selectionMode="single"
                  selectedKeys={backLogSelectedIssue}
                  onSelectionChange={handleSelectionBackLogSelectedIssue}
                >
                    {issues.map((issue) => (
                      <ListboxItem
                        key={issue.id}
                        textValue={issue.name}
                        variant="flat"
                        // color="warning"

                        className={`rounded-sm text-3xl gap-4 border-2 
                        ${issue.status === "Nowe" ? "border-primary-400" : ""}
                        ${issue.status === "Zakończone" ? "border-green-600" : ""}
                        ${issue.status === "W trakcie" ? "border-yellow-500" : ""}

                        `}
                        startContent={
                          <IconWrapper className="bg-success/10 text-success">
                            <BugIcon className="text-2xl " />
                          </IconWrapper>
                        }
                      >
                        <div className="">
                          <div className="flex flex-row justify-start gap-2">
                            <div>
                              <p className="text-lg">{issue.name}</p>
                            </div>
                            <div>
                              <Chip className={`text-lg
                                ${issue.status === "Nowe" ? "bg-primary-400" : ""}
                                ${issue.status === "Zakończone" ? "bg-green-600" : ""}
                                ${issue.status === "W trakcie" ? "bg-yellow-500" : ""}`}>{issue.status}</Chip>
                            </div>
                          </div>
                        </div>
                      </ListboxItem>
                    ))}
                </Listbox>
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
