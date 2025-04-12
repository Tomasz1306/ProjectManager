package com.projectmanager.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import com.projectmanager.backend.domain.ProjectUser;
import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.dto.request.ProjectDeleteRequestDTO;
import com.projectmanager.backend.dto.request.ProjectUsersRequestDTO;
import com.projectmanager.backend.dto.request.UserResponseDTO;
import com.projectmanager.backend.dto.response.*;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.repository.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanager.backend.domain.Project;
import com.projectmanager.backend.dto.request.ProjectCreateRequestDTO;
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

        if (projectUser.isPresent()) {
            return ProjectUserResponseDTO
                    .builder()
                    .projectUser(projectUser.get())
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
        System.out.println("User Projects found: " + projects);
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
        System.out.println(projectUser.get());
        if (projectUser.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("User is assigned to project").status(false).build();
        }
        if (!projectUser.get().getIsOwner()) {
            return ProjectDeleteResponseDTO.builder().information("User is not a owner of project").status(false)
                    .build();
        }
        Long id = projectToDelete.get().getId();
        projectUserRepository.delete(projectUser.get());
        projectRepository.delete(projectUser.get().getProject());
        return ProjectDeleteResponseDTO.builder().information("Successfully").status(true).projectId(id).build();
    }

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
        List<UserResponseDTO> users = new ArrayList<>();
        List<ProjectUser> projectUsers = projectUserRepository.findByProject(project.get());
        for (var projectUser_: projectUsers) {
            UserResponseDTO user_ = UserResponseDTO
                    .builder().id(projectUser_.getUser().getId())
                    .name(projectUser_.getUser().getName())
                    .username(projectUser_.getUser().getUsername())
                    .email(projectUser_.getUser().getEmail())
                    .build();
            users.add(user_);
        }
        return ProjectUsersResponseDTO
        .builder()
                .information("Successfully")
                .users(users)
                .build();
    }
}
