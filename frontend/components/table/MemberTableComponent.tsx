import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import {
    ProjectDeleteUserResponseDTO,
    ProjectUser,
    User
} from "@/types/types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { VerticalDotsIcon } from "./MyTableIssueComponent";
import { useEffect } from "react";


const columns = [
    {name: "Name", uid: "name", sortable: true},
    {name: "Email", uid: "email", sortable: true},
    {name: "Role", uid: "role", sortable: true},
    {name: "Actions", uid: "actions", sortable: true},
]


function MemberTableComponent ({projectMembers, setProjectMembers}:
     {
        projectMembers: ProjectUser[],
        setProjectMembers: (projectMembers: ProjectUser[]) => void
    }) {

    async function DeleteUser(projectMember: ProjectUser) {
        const initiator: User | undefined = projectMembers.find((user) => user.user.id === Number(localStorage.getItem("id")))?.user;
        console.log(initiator);
        const response = await fetch(`http://localhost:8080/api/v1/projects/deleteUser`, {
            method: "POST",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: projectMember.user, 
                projectId: projectMember.project.id,
                initiator: initiator,
            }),
        })
        if (response.ok) {
            const projectDeleteUserResponse: ProjectDeleteUserResponseDTO = await response.json();
            if (projectDeleteUserResponse.status) {
                setProjectMembers(projectMembers.filter((user) => user.id !== projectMember.id))
            }
        }
    }

    return (
        <>
            <Table
                aria-label="Example table with dynamic content"
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody 
                    emptyContent="No users found" items={projectMembers}
                >
                    {(projectMember) => (
                        <TableRow key={projectMember.id}>
                            {(columnKey) => 
                            <TableCell>
                                {columnKey === "name" && (
                                    <p>{projectMember.user.name}</p>
                                )}
                                {columnKey === "email" && (
                                    <p>{projectMember.user.email}</p>
                                )}
                                {columnKey === "role" && (
                                    <p>{projectMember.role}</p>
                                )}
                                {columnKey === "actions" && (
                                    <div className="relative flex justify-end items-center gap-2">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly size="sm" variant="light">
                                                    <VerticalDotsIcon className="text-default-300" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem key="view">View</DropdownItem>
                                                <DropdownItem key="edit">Edit</DropdownItem>
                                                <DropdownItem onPress={() => DeleteUser(projectMember)} key="delete">Delete</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                )}
                            </TableCell>}
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </>
    );
}

export default MemberTableComponent;