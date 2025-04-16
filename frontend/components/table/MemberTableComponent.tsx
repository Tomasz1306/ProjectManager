import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import {
    ProjectUser,
    User
} from "@/types/types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { VerticalDotsIcon } from "./MyTableIssueComponent";


const columns = [
    {name: "Name", uid: "name", sortable: true},
    {name: "Email", uid: "email", sortable: true},
    {name: "Role", uid: "role", sortable: true},
    {name: "Actions", uid: "actions", sortable: true},
]


function MemberTableComponent ({projectUsers}: {projectUsers: ProjectUser[]}) {


    return (
        <>
            <Table
            
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
                    emptyContent="No users found" items={projectUsers}
                >
                    {(projectUser) => (
                        <TableRow key={projectUser.id}>
                            {(columnKey) => 
                            <TableCell>
                                {columnKey === "name" && (
                                    <p>{projectUser.user.name}</p>
                                )}
                                {columnKey === "email" && (
                                    <p>{projectUser.user.email}</p>
                                )}
                                {columnKey === "role" && (
                                    <p>{projectUser.role}</p>
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
                                                <DropdownItem key="delete">Delete</DropdownItem>
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