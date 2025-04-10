"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";
import type { Selection } from "@react-types/shared";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import NextLink from "next/link";
import { cn } from "@heroui/theme";
import {
  ProjectDeleteRequestDTO,
  ProjectCreateRequestDTO,
  ProjectDeleteResponseDTO,
  ProjectsResponseDTO, Project,
} from "@/types/types";

// eslint-disable-next-line react/display-name
export default function () {
  const [projects, setProjects] = useState<Project[]>([]);

  async function handleDeleteProject(projectId: number) {

    const projectDeleteRequestDTO: ProjectDeleteRequestDTO = {
      projectId: projectId,
      userId: Number(localStorage.getItem("id")),
    }

    const response = await fetch(
      "http://localhost:8080/api/v1/deleteProject/" + projectId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(projectDeleteRequestDTO),
      }
    );
    if (response.ok) {
      const projectDeleteResponseDTO: ProjectDeleteResponseDTO = await response.json();
      console.log("USUNIETO: ", projectDeleteResponseDTO);
      addToast({
        title: "SUCCESS!",
        description: "The project was successful deleted",
        color: "danger",
        radius: "none",
      });

      setProjects(
        projects.filter((project, index) => project.id !== projectId)
      );
    } else if (response.status === 404) {
      // PROJECT NOT FOUND
      addToast({
        title: "WARNING",
        description: "Project not found",
        color: "warning",
        radius: "none",
      });
      console.log("project not found");
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        `http://localhost:8080/api/v1/projects/userProjects/${localStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        console.log(response);
        const jsonResponse: ProjectsResponseDTO = await response.json();
        console.log(jsonResponse);
        setProjects(jsonResponse.projects);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-end ">
        <Button
          as={Link}
          variant="light"
          color="success"
          size="lg"
          radius="none"
          className="border-1 border-green-500"
          href="/projects/create"
        >
          Create
        </Button>
      </div>

      <div className="flex bg-zinc-950 w-[100%] justify-center my-2">
        <div className="w-full flex flex-col gap-4">
          {projects.map((project) => (
            <div key={project.id} className="w-full border-1">
              <Card key={project.id} className="bg-stone-950">
                <CardBody key={project.id}>
                  <div className="flex flex-row gap-4 justify-between ">
                    <div className="">
                      <p className="text-3xl">{project.name}</p>
                      <p>{project.description}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Button
                        key={2}
                        variant="light"
                        color="secondary"
                        radius="none"
                        className="border-1 border-purple-500"
                        as={NextLink}
                        href={{
                          pathname: `/projects/project`,
                          query: {
                            projectId: `${project.id}`,
                          },
                        }}
                      >
                        Open
                      </Button>
                      <Button
                        key={1}
                        onPress={() => handleDeleteProject(project.id)}
                        variant="light"
                        color="danger"
                        radius="none"
                        className="border-1 border-pink-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
