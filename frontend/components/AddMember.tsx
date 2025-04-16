import {
  AddUserToProjectResponseDTO,
  ProjectUser,
  User,
  UserFindByEmailKeyRequestDTO,
  UserFindByEmailKeyResponseDTO,
} from "@/types/types";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/react";
import { Key, ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";

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
]

const AddMember = ({
  projectId, 
  projectOwner, 
  projectMembers, 
  setProjectMembers
}:
   {
    projectId: number, 
    projectOwner: User | undefined,
    projectMembers: ProjectUser[],
    setProjectMembers: (projectUser: ProjectUser[]) => void
  }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [people, setPeople] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<User>();
  const [selectedRole, setSelectedRole] = useState(new Set([]));

  useEffect(() => {
    if (search.length === 0) {
      setPeople([]);
      return;
    }
    async function searchPeople() {
      const response = await fetch(`http://localhost:8080/api/v1/users`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: search }),
      });
      if (response.ok) {
        const usersFindedByEmailKey: UserFindByEmailKeyResponseDTO =
          await response.json();
        setPeople(usersFindedByEmailKey.users);
      }
    }
    searchPeople();
  }, [search]);

  async function addMember() {
    if (selectedMember === undefined || selectedRole === undefined) {
      return;
    }
    if (people.find((user) => user.id === selectedMember?.id)) {
      return
    } else {
      const role = roles.find((role) => role.id === Number(selectedRole.keys().next().value))?.type
      const isOwner: boolean = projectOwner?.id === Number(localStorage.getItem("id")) ? true: false;
      console.log(projectOwner);
      console.log(localStorage.getItem("id"))
      console.log(isOwner);
      const response = await fetch (`http://localhost:8080/api/v1/projects/addUser`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: selectedMember, 
          projectId: projectId, 
          owner: isOwner,
          projectRole: role,
        }),
      })
      if (response.ok) {
        const addUserToProjectResponse = await response.json();
        console.log("CYZ JEST PROJECT USER? :" , addUserToProjectResponse);
        setProjectMembers([...projectMembers, addUserToProjectResponse.projectUser]);
        onOpenChange();
      }
    }
  }

  function handleSelectMember(key: Key | null) {
    setSelectedMember(
      people.find((user) => user.email === key)
    )
    console.log(  people.find((user) => user.email === key));
  }


  return (
    <div>
      <Button onPress={onOpen}>AddMember</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          <ModalBody>
            <Autocomplete
              label="Find by email"
              defaultItems={people}
              inputValue={search}
              // selectedKey={selectedMember?.email}
              onSelectionChange={(key) => handleSelectMember(key)}
              onInputChange={(e) => setSearch(e)}
            >
              {people.map((person) => (
                <AutocompleteItem key={person.email} textValue={person.name}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-small">{person.name}</span>
                        <span className="text-tiny text-default-400">
                          {person.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <p>SELECTED PERSON: {selectedMember?.email}</p>
            <p>Select role</p>
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
            <div className="flex flex-row justify-center gap-4">
              <Button onPress={() => addMember()}>Add</Button>
              <Button onPress={onOpenChange}>Decline</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddMember;
