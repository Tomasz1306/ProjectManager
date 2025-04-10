"use client";
import { useDisclosure } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { useEffect, useState } from "react";
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
import {
  Project,
  IssuePriority,
  IssueStatus,
  Issue,
  Role,
  User,
  ProjectUser,
  ProjectUserIssue,
  CreateProjectResponseDTO,
  ProjectDeleteResponseDTO,
  ProjectIdResponseDTO,
  ProjectsResponseDTO,
  ProjectCreateRequestDTO,
  ProjectDeleteRequestDTO,
  CheckTokenResponse,
  ProjectUserResponseDTO
} from "@/types/types"

export default function ProjectPage(projectId: number) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const params = useSearchParams();
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [creator, setCreator] = useState<User>();
  const [selectedIssue, setSeletedIssue] = useState<Issue>();

  useEffect(() => {
    async function checkToken() {
      await fetch(
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
          console.log(response);
          if (response.ok) {
            const checkTokenResponse = await response.json();
            console.log("TO JEST OK: ? ", checkTokenResponse);
            if (checkTokenResponse.valid) {
              setIsValidToken(true);
            } else {
              console.log("PIERWSZY");
              router.push("/auth/login");
            }
          } else {
            console.log("DRUGI");
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
        `http://localhost:8080/api/v1/projects/${localStorage.getItem("id")}/${params.get("projectId")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const projectUserResponseDTO: ProjectUserResponseDTO = await response.json();
        console.log(projectUserResponseDTO);
        setCurrentProject(projectUserResponseDTO.projectUser.project);
      } else {
        router.push("/projects");
      }
    }

    fetchProject();
  }, []);

  // useEffect(() => {
  //   async function fetchProjectIssues() {
  //     const response = await fetch(
  //       `http://localhost:8080/api/v1/projectIssues/${params.get("projectId")}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer" + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const jsonResponse: IssueResponse = await response.json();
  //       setIssues(jsonResponse.issues);
  //       console.log(jsonResponse);
  //     }
  //   }
  //   fetchProjectIssues();
  // }, []);

  
  return (
    <div>
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
            {/*<Tab title="Issues" className="rounded-sm ">*/}
            {/*  <Card className="bg-transparent rounded-sm">*/}
            {/*    <CardBody className="bg-transparent">*/}
            {/*      <MyTableConponent issuesProps={issues}></MyTableConponent>*/}
            {/*    </CardBody>*/}
            {/*  </Card>*/}
            {/*</Tab>*/}
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
    </div>
  );
}
