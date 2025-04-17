import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IssuePriority {
  id: number;
  name: string;
}

export interface IssueStatus {
  id: number;
  name: string;
}

export interface Issue {
  id: number;
  name: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
}

export interface Role {
  id: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
}

export interface ProjectUser {
  id: number;
  project: Project;
  user: User;
  role: String;
  owner: boolean;
}

export interface ProjectUserIssue {
  id: number;
  projectUser: ProjectUser;
  issue: Issue;
}

export interface ProjectCreateResponseDTO {
  projectId: number;
  status: boolean;
  information: string;
}

export interface ProjectDeleteResponseDTO {
  information: string;
  status: boolean;
  projectId: number;
}

export interface ProjectIdResponseDTO {
  project: Project;
}

export interface ProjectsResponseDTO {
  projects: Project[];
}

export interface ProjectCreateRequestDTO {
  creatorId: number;
  name: string;
  description: string;
}

export interface ProjectDeleteRequestDTO {
  projectId: number;
  userId: number;
}

export interface CheckTokenResponse {
  isValid: boolean;
}

export interface ProjectUserResponseDTO {
  projectUser: ProjectUser;
}

export interface UserFindByEmailKeyRequestDTO {
  key: string;
}

export interface UserFindByEmailKeyResponseDTO {
  users: User[];
}

export interface ProjectUsersResponseDTO {
  projectUsers: ProjectUser[];
  information: string;
}

export interface AddUserToProjectResponseDTO {
  information: string;
  status: boolean;
  projectUser: ProjectUser;
}

export interface ProjectDeleteUserResponseDTO {
  information: string;
  status: boolean;
}