import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import {
  ProjectDeleteUserResponseDTO,
  ProjectUpdateUserRespnseDTO,
  ProjectUser,
  User,
} from "@/types/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { VerticalDotsIcon } from "./MyTableIssueComponent";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/react";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Role", uid: "role", sortable: true },
  { name: "Actions", uid: "actions", sortable: true },
];
const roles = [
  {
    id: 1,
    name: "project manager",
    type: "PROJECT_MANAGER",
  },
  {
    id: 2,
    name: "team leader",
    type: "TEAM_LEADER",
  },
  {
    id: 3,
    name: "developer",
    type: "DEVELOPER",
  },
  {
    id: 4,
    name: "QA engineer",
    type: "QA_ENGINEER",
  },
  {
    id: 5,
    name: "DevOps engineer",
    type: "DEVOPS_ENGINEER",
  },
  {
    id: 6,
    name: "designer",
    type: "DESIGNER",
  },
  {
    id: 7,
    name: "scrum master",
    type: "SCRUM_MASTER",
  },
];

function MemberTableComponent({
  projectMembers,
  setProjectMembers,
}: {
  projectMembers: ProjectUser[];
  setProjectMembers: (projectMembers: ProjectUser[]) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [memberToModify, setMemberToModify] = useState<ProjectUser>();
  const [selectedRole, setSelectedRole] = useState(new Set([]));

  function ModifyMemberModal(projectMember: ProjectUser) {
    setMemberToModify(projectMember);
    onOpenChange();
  }

  async function updateMember() {
    const initiator: User | undefined = projectMembers.find(
      (user) => user.user.id === Number(localStorage.getItem("id"))
    )?.user;
    const role = roles.find(
      (role) => role.id === Number(selectedRole.keys().next().value)
    )?.type;
    console.log(memberToModify)
    const response = await fetch(
      "http://localhost:8080/api/v1/projects/updateUser",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initiator: initiator,
          projectUserToUpdate: memberToModify,
          projectId: memberToModify?.project.id,
          newRole: role,
        }),
      }
    );
    if (response.ok) {
      const projectUpdateUserResponse: ProjectUpdateUserRespnseDTO =
        await response.json();
      console.log(projectUpdateUserResponse);
    }
  }

  async function DeleteUser(projectMember: ProjectUser) {
    const initiator: User | undefined = projectMembers.find(
      (user) => user.user.id === Number(localStorage.getItem("id"))
    )?.user;
    console.log(initiator);
    const response = await fetch(
      `http://localhost:8080/api/v1/projects/deleteUser`,
      {
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
      }
    );
    if (response.ok) {
      const projectDeleteUserResponse: ProjectDeleteUserResponseDTO =
        await response.json();
      if (projectDeleteUserResponse.status) {
        setProjectMembers(
          projectMembers.filter((user) => user.id !== projectMember.id)
        );
      }
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <p>Current Role: {memberToModify?.role}</p>
              <p>Set other role</p>
              <Select
                items={roles}
                placeholder="Select role"
                selectedKeys={selectedRole}
                onSelectionChange={setSelectedRole}
              >
                {(item) => (
                  <SelectItem key={item.id} textValue={item.name}>
                    <p>{item.name}</p>
                  </SelectItem>
                )}
              </Select>
              <Button onPress={() => updateMember()}>Update</Button>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found" items={projectMembers}>
          {(projectMember) => (
            <TableRow key={projectMember.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "name" && <p>{projectMember.user.name}</p>}
                  {columnKey === "email" && <p>{projectMember.user.email}</p>}
                  {columnKey === "role" && <p>{projectMember.role}</p>}
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
                          <DropdownItem
                            onPress={() => ModifyMemberModal(projectMember)}
                            key="edit"
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onPress={() => DeleteUser(projectMember)}
                            key="delete"
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default MemberTableComponent;
