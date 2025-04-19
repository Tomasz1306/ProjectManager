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
  ProjectsResponseDTO,
  Project,
} from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/autocomplete";
import { Input } from "@heroui/input";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Role", uid: "email", sortable: true },
  { name: "Status", uid: "role", sortable: true },
  { name: "Actions", uid: "actions", sortable: true },
];

export default function () {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [foundedProjects, setFoundedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (search === "") {
      setFoundedProjects(projects)
    }
    setFoundedProjects(
      projects.filter((project) => {
        if (project.name.match(search) !== null) {
          return project;
        }
      })
    )
  }, [search])

  async function handleDeleteProject(projectId: number) {
    const projectDeleteRequestDTO: ProjectDeleteRequestDTO = {
      projectId: projectId,
      userId: Number(localStorage.getItem("id")),
    };

    const response = await fetch(
      `http://localhost:8080/api/v1/projects/delete`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectDeleteRequestDTO),
      }
    );
    if (response.ok) {
      const projectDeleteResponseDTO: ProjectDeleteResponseDTO =
        await response.json();
      console.log("USUNIETO: ", projectDeleteResponseDTO);
      if (!projectDeleteResponseDTO.status) {
        addToast({
          title: "CANNOT DELETE PROJECT",
          description: projectDeleteResponseDTO.information,
          color: "danger",
          radius: "none",
        });
      } else {
        addToast({
          title: "SUCCESS!",
          description: "The project was successful deleted",
          color: "success",
          radius: "none",
        });
        setProjects(
          projects.filter((project, index) => project.id !== projectId)
        );
      }
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
        setFoundedProjects(jsonResponse.projects);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="my-4">
        <p className="text-5xl font-bold">Projects</p>
      </div>
      <div className="my-4">
        <Input
          isClearable
          classNames={{
            label: "text-white text-lg",
            input: [" text-lg text-white"],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl rounded-none bg-[#38214A] text-white",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "!cursor-text",
            ],
          }}
          value={search}
          onValueChange={setSearch}
          placeholder="Search project..."
        ></Input>
      </div>
      <div>
        <Table
          radius="none"
          className=" bg-[#1A0F24] text-white 
        overflow-hidden shadow-md rounded-none border-1 border-[#4F3069]"
          removeWrapper
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                className="bg-[#291733] text-left text-sm font-semibold
                text-white uppercase tracking-wide rounded-none"
                key={column.uid}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            className="bg-[#1A0F24]"
            emptyContent="No projects found"
            items={foundedProjects}
          >
            {(project) => (
              <TableRow key={project.id} className="">
                {(columnKey) => (
                  <TableCell className="">
                    {columnKey === "name" && <p>{project.name}</p>}
                    {columnKey === "email" && <p>{project.name}</p>}
                    {columnKey === "role" && <p>{project.name}</p>}
                    {columnKey === "actions" && (
                      <div className="flex flex-row gap-4">
                        <Button
                          key={2}
                          variant="light"
                          color="secondary"
                          radius="none"
                          className="font-bold border-purple-500"
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
                          className="font-bold border-pink-800"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="my-4 w-[50%]">
        <Button
          as={Link}
          href="/projects/create"
          className="rounded-none w-full bg-[#291733] font-bold text-lg"
        >
          + Create new project
        </Button>
      </div>
    </div>
  );
}
