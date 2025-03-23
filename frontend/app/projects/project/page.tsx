"use client";
import type { Selection } from "@react-types/shared";
import { SortDescriptor } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { SVGProps, useEffect, useMemo, useState } from "react";
import React from "react";
import { Chip, ChipProps } from "@heroui/chip";
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
import { Pagination } from "@heroui/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { User } from "@heroui/user";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { capitalize } from "@mui/material";
export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[400px] border-1 px-1 py-2 rounded-sm border-violet-600 ">
    {children}
  </div>
);

export const LowPriorityIcon = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
};

export const MediumPriorityIcon = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="7" x2="12" y2="13" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
};

export const HighPriorityIcon = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <polygon points="12,2 22,20 2,20" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
};

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

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const PlusIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "PRIORITY", uid: "priority", sortable: true },
  { name: "TYPE", uid: "type" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

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

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "status", "priority", "type"];

export default function ProjectPage(projectId: number) {
  const params = useSearchParams();
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [creator, setCreator] = useState<Person>();

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

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...issues];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [issues, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Issue, b: Issue) => {
      const first = a[sortDescriptor.column as keyof Issue] as number;
      const second = b[sortDescriptor.column as keyof Issue] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((issue: Issue, columnKey: React.Key) => {
    const cellValue = issue[columnKey as keyof Issue];

    switch (columnKey) {
      case "id":
        return <p className="text-lg">{issue.id}</p>;
      case "name":
        return (
          <div>
            <p className="text-lg">{issue.name}</p>
            <p className="text-white/30">{issue.description}</p>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col">
            <Chip
              className={` rounded-sm text-lg
              ${issue.status === "Nowe" ? " bg-blue-600/50 border-2 border-blue-500/70 roudned-sm backdrop-blur-sm" : ""}
               ${issue.status === "W trakcie" ? " bg-yellow-300/50 border-2 border-yellow-300/70 rounded-sm backdrop-blur-sm" : ""}
                ${issue.status === "Zakończone" ? " bg-green-600/50 border-2 border-green-500/70 runded-sm backdrop-blur-sm" : ""}
              `}
            >
              {issue.status}
            </Chip>
          </div>
        );
      case "priority":
        return (
          <div>
            {issue.priority === "Niska" && (
              <div className="flex flex-row gap-1">
                <IconWrapper key={issue.id} className=" text-orange-500">
                  <HighPriorityIcon className="text-2xl"></HighPriorityIcon>
                </IconWrapper>
                <p className="text-lg">P1</p>
              </div>
            )}
            {issue.priority === "Wysoka" && (
              <div className="flex flex-row gap-1">
                <IconWrapper key={issue.id} className=" text-orange-700">
                  <HighPriorityIcon className="text-2xl"></HighPriorityIcon>
                </IconWrapper>
                <p className="text-lg">P2</p>
              </div>
            )}
            {issue.priority === "Średnia" && (
              <div className="flex flex-row gap-1">
                <IconWrapper key={issue.id} className=" text-orange-900">
                  <HighPriorityIcon className="text-2xl"></HighPriorityIcon>
                </IconWrapper>
                <p className="text-lg">P3</p>
              </div>
            )}
          </div>
        );
      case "type":
        return (
          <div>
            <p>{issue.type}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" radius="none" variant="light">
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
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {issues.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    issues.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
          <Tab title="Issues" className="rounded-sm ">
            <Card className="bg-transparent rounded-sm">
              <CardBody className="bg-transparent">
                <Table
                  radius="none"
                  isHeaderSticky
                  aria-label="Example table with custom cells, pagination and sorting"
                  bottomContent={bottomContent}
                  bottomContentPlacement="outside"
                  classNames={{
                    wrapper: "max-h-[382px] min-h-[382px]",
                    base: ""
                  }}
                  selectedKeys={selectedKeys}
                  selectionMode="multiple"
                  sortDescriptor={sortDescriptor}
                  topContent={topContent}
                  topContentPlacement="outside"
                  onSelectionChange={setSelectedKeys}
                  onSortChange={setSortDescriptor}
                >
                  <TableHeader columns={headerColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                      >
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    emptyContent={"No users found"}
                    items={sortedItems}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
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
  );
}
