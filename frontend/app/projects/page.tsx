"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import type { Selection } from "@react-types/shared";
import { useEffect, useMemo, useState } from "react";
import React from "react";

interface Project {
  name: string;
  description: string;
  creatorid: number;
  id: number;
}

export default function () {
  const [projects, setProjects] = useState<Project[]>([]);

  async function handleDeleteProject(projectId: number) {
    const response = await fetch(
      "http://localhost:8080/api/v1/deleteProject/" + projectId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.ok) {
      // ADD TOAST DELETED SUCCESSFUL

      setProjects(
        projects.filter((project, index) => project.id !== projectId)
      );
    } else if (response.status === 404) {
      // PROJECT NOT FOUND
      console.log("project not found");
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch(
        `http://localhost:8080/api/v1/projects?email=${localStorage.getItem("email")}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const jsonResponse: Project[] = await response.json();
        console.log(jsonResponse);
        setProjects(jsonResponse);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="w-full flex justify-center ">
      <div className="flex bg-zinc-950 w-[100%] justify-center">
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
