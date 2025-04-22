package com.projectmanager.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.projectmanager.backend.domain.ProjectUser;
import com.projectmanager.backend.domain.Role;
import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.dto.request.*;
import com.projectmanager.backend.dto.response.*;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.projectmanager.backend.domain.Project;
import com.projectmanager.backend.repository.ProjectRepository;

@Service("ProjectUserService")
public class ProjectUserService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;

    public ProjectCreateResponseDTO createProject(ProjectCreateRequestDTO request) {
        Optional<Project> project = projectRepository.findByName(request.getName());
        Optional<User> user = userRepository.findById(request.getCreatorId());
        if (project.isPresent()) {
            return ProjectCreateResponseDTO
                    .builder()
                    .information("Project with that name exists")
                    .status(false)
                    .build();
        }
        if (user.isEmpty()) {
            return ProjectCreateResponseDTO
                    .builder()
                    .information("User not exists")
                    .status(false)
                    .build();
        }
        Project newProject = Project.builder().name(request.getName()).description(request.getDescription()).build();
        Project createdProject = projectRepository.save(newProject);
        ProjectUser newProjectUser = ProjectUser
                .builder()
                .project(createdProject)
                .user(user.get())
                .projectRole(Role.PROJECT_MANAGER)
                .isOwner(true)
                .build();
        projectUserRepository.save(newProjectUser);
        return ProjectCreateResponseDTO.builder().information("Successfully").status(true)
                .projectId(createdProject.getId()).build();
    }

    public ProjectUserService(UserRepository userRepository, ProjectRepository projectRepository,
            ProjectUserRepository projectUserRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.projectUserRepository = projectUserRepository;
    }

    public ProjectIdResponseDTO getProjectById(Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            return ProjectIdResponseDTO.builder().project(project.get()).build();
        }
        return ProjectIdResponseDTO.builder().build();
    }

    public ProjectsResponseDTO getProjects() {
        List<Project> projects = projectRepository.findAll();
        return ProjectsResponseDTO.builder().projects(projects).build();
    }

    public ProjectUserResponseDTO getUserProject(Long userId, Long projectId) {
        Project project = projectRepository.findById(projectId).get();
        User user = userRepository.findById(userId).get();
        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectAndUser(project, user);

        UserDTO userDTO = UserDTO
                .builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();

        if (projectUser.isPresent()) {
            ProjectUserDTO projectUserDTO = ProjectUserDTO
                    .builder()
                    .id(projectUser.get().getId())
                    .user(userDTO)
                    .project(project)
                    .role(projectUser.get().getProjectRole().name())
                    .owner(projectUser.get().getIsOwner())
                    .build();
            return ProjectUserResponseDTO
                    .builder()
                    .projectUser(projectUserDTO)
                    .build();
        }
        return ProjectUserResponseDTO.builder().build();
    }

    public ProjectsResponseDTO getUserProjects(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        List<ProjectUser> projectUsers = projectUserRepository.findByUser(user.get());
        List<Project> projects = new ArrayList<>();
        for (var projectUser : projectUsers) {
            Optional<Project> project = projectRepository.findById(projectUser.getProject().getId());
            if (project.isPresent()) {
                projects.add(project.get());
            }
        }
        return ProjectsResponseDTO.builder().projects(projects).build();
    }

    public ProjectDeleteResponseDTO deleteProject(ProjectDeleteRequestDTO request) {
        Optional<Project> projectToDelete = projectRepository.findById(request.getProjectId());
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("Wrong user id").build();
        }
        if (projectToDelete.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("Project not exists").status(false).build();
        }
        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectAndUser(projectToDelete.get(),
                user.get());
        if (projectUser.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("User is assigned to project").status(false).build();
        }
        if (!projectUser.get().getIsOwner()) {
            return ProjectDeleteResponseDTO.builder().information("User is not a owner of project").status(false)
                    .build();
        }
        Long id = projectToDelete.get().getId();
        List<ProjectUser> projectUsers = projectUserRepository.findByProject(projectToDelete.get());
        System.out.println(projectUsers);
        projectUserRepository.deleteAll(projectUsers);
        projectRepository.delete(projectToDelete.get());
        return ProjectDeleteResponseDTO.builder().information("Successfully").status(true).projectId(id).build();
    }

    //TODO ADD TO TESTS (getProjectusers)
    public ProjectUsersResponseDTO getProjectUsers(ProjectUsersRequestDTO request) {
        Optional<Project> project = projectRepository.findById(request.getProjectId());
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isEmpty()) {
            return ProjectUsersResponseDTO.builder().information("Wrong user id").build();
        }

        if (project.isEmpty()) {
            return ProjectUsersResponseDTO.builder().information("Wrong project id").build();
        }

        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectAndUser(project.get(), user.get());
        if (projectUser.isEmpty()) {
            return ProjectUsersResponseDTO.builder().information("User is not assigned to this project").build();
        }
        List<ProjectUserDTO> projectUsersDTO = new ArrayList<>();
        List<ProjectUser> projectUsers = projectUserRepository.findByProject(project.get());
        for (var projectUser_: projectUsers) {
            UserDTO user_ = UserDTO
                    .builder().id(projectUser_.getUser().getId())
                    .name(projectUser_.getUser().getName())
                    .username(projectUser_.getUser().getUsername())
                    .email(projectUser_.getUser().getEmail())
                    .build();
            projectUsersDTO.add(ProjectUserDTO
                    .builder()
                    .user(user_)
                    .owner(projectUser_.getIsOwner())
                    .id(projectUser_.getId())
                    .project(projectUser_.getProject())
                    .role(projectUser_.getProjectRole().name())
                    .build());
        }
        return ProjectUsersResponseDTO
                .builder()
                .information("Successfully")
                .projectUsers(projectUsersDTO)
                .build();
    }
    //TODO ADD TO TESTS (addUserToProject)
    //TODO change boolean owner in request to UserDTO
    public AddUserToProjectResponseDTO addUserToProject(AddUserToProjectRequestDTO request) {
        if (!request.isOwner()) {
            return AddUserToProjectResponseDTO
                    .builder()
                    .information("You are not a owner of project")
                    .status(false)
                    .build();
        }
        Optional<User> user = userRepository.findById(request.getUser().getId());
        Optional<Project> project = projectRepository.findById(request.getProjectId());
        if (project.isEmpty()) {
            return AddUserToProjectResponseDTO
                    .builder()
                    .information("Project not exists")
                    .status(false)
                    .build();
        }
        ProjectUser newProjectUser = ProjectUser
                .builder()
                .project(project.get())
                .user(user.get())
                .isOwner(false)
                .projectRole(request.getProjectRole())
                .build();
        ProjectUser addedProjectUser = projectUserRepository.save(newProjectUser);
        UserDTO userDTO = UserDTO
                .builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .username(user.get().getUsername())
                .email(user.get().getEmail())
                .build();
        ProjectUserDTO addedProjectUserDTO = ProjectUserDTO
                .builder()
                .project(addedProjectUser.getProject())
                .user(userDTO)
                .owner(false)
                .role(addedProjectUser.getProjectRole().name())
                .id(addedProjectUser.getId())
                .build();
        return AddUserToProjectResponseDTO
                .builder()
                .information("Successfully")
                .status(true)
                .projectUser(addedProjectUserDTO)
                .build();
    }

    public ProjectDeleteUserResponseDTO deleteUserFromProject(ProjectDeleteUserRequestDTO request) {
        Optional<User> initiator = userRepository.findById(request.getInitiator().getId());
        Optional<Project> project = projectRepository.findById(request.getProjectId());
        if (initiator.isEmpty()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("You are not in a database")
                    .build();
        }
        if (project.isEmpty()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("Cannot find project")
                    .status(false)
                    .build();
        }
        Optional<ProjectUser> projectUserInitiator = projectUserRepository.findByProjectAndUser(project.get(), initiator.get());
        if (projectUserInitiator.isEmpty()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("You are not assigned to this project")
                    .status(false)
                    .build();
        }
        if (!projectUserInitiator.get().getIsOwner()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("You are not a owner of project")
                    .status(false)
                    .build();
        }
        Optional<User> userToDelete = userRepository.findById(request.getUser().getId());
        if (userToDelete.isEmpty()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("Cannot find user to delete")
                    .status(false)
                    .build();
        }
        Optional<ProjectUser> projectUserToDelete = projectUserRepository.findByProjectAndUser(project.get(), userToDelete.get());
        if (projectUserToDelete.isEmpty()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("User is not assigned to this project")
                    .status(false)
                    .build();
        }
        if (projectUserToDelete.get().getIsOwner()) {
            return ProjectDeleteUserResponseDTO
                    .builder()
                    .information("Cannot delete project owner")
                    .status(false)
                    .build();
        }
        projectUserRepository.delete(projectUserToDelete.get());
        return ProjectDeleteUserResponseDTO
                .builder()
                .information("Successfully deleted")
                .status(true)
                .build();
    }

    public ProjectUpdateUserResponseDTO updateProjectUser(ProjectUpdateUserRequestDTO request) {
        Optional<User> initiator = userRepository.findById(request.getInitiator().getId());
        Optional<Project> project = projectRepository.findById(request.getProjectId());
        if (initiator.isEmpty()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("You are not in a database")
                    .build();
        }
        if (project.isEmpty()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("Cannot find project")
                    .status(false)
                    .build();
        }
        Optional<ProjectUser> projectUserInitiator = projectUserRepository.findByProjectAndUser(project.get(), initiator.get());
        if (projectUserInitiator.isEmpty()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("You are not assigned to this project")
                    .status(false)
                    .build();
        }
        if (!projectUserInitiator.get().getIsOwner()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("You are not a owner of project")
                    .status(false)
                    .build();
        }
        Optional<User> userToUpdate = userRepository.findById(request.getProjectUserToUpdate().getUser().getId());
        if (userToUpdate.isEmpty()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("User to update not exists")
                    .status(false)
                    .build();
        }
        Optional<ProjectUser> projectUserToUpdate = projectUserRepository.findByProjectAndUser(project.get(), userToUpdate.get());
        if (projectUserToUpdate.isEmpty()) {
            return ProjectUpdateUserResponseDTO
                    .builder()
                    .information("User is not assigned to this project")
                    .status(false)
                    .build();
        }
        projectUserToUpdate.get().setProjectRole(request.getNewRole());
        projectUserRepository.save(projectUserToUpdate.get());

        User updatedUser = userRepository.findById(projectUserToUpdate.get().getUser().getId()).get();
        UserDTO updatedUserDTO = UserDTO
                .builder()
                .id(updatedUser.getId())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .build();
        ProjectUserDTO updatedProjectUserDTO = ProjectUserDTO
                .builder()
                .user(updatedUserDTO)
                .project(projectUserToUpdate.get().getProject())
                .owner(projectUserToUpdate.get().getIsOwner())
                .role(projectUserToUpdate.get().getProjectRole().name())
                .build();
        return ProjectUpdateUserResponseDTO
                .builder()
                .information("Successfully updated")
                .status(true)
                .projectUser(updatedProjectUserDTO)
                .build();
    }
}
