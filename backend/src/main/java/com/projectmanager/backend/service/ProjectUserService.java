package com.projectmanager.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import com.projectmanager.backend.domain.ProjectUser;
import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.dto.request.ProjectDeleteRequestDTO;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.repository.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanager.backend.domain.Project;
import com.projectmanager.backend.dto.request.ProjectCreateRequestDTO;
import com.projectmanager.backend.dto.response.ProjectCreateResponseDTO;
import com.projectmanager.backend.dto.response.ProjectDeleteResponseDTO;
import com.projectmanager.backend.dto.response.ProjectIdResponseDTO;
import com.projectmanager.backend.dto.response.ProjectsResponseDTO;
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
        return ProjectCreateResponseDTO.builder().information("Successfully").status(true).projectId(createdProject.getId()).build();
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
        System.out.println("Projects found: " + projects);
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
        Optional<ProjectUser> projectUser = projectUserRepository.findByProjectAndUser(projectToDelete.get(), user.get());
        System.out.println(projectUser.get());
        if (projectUser.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("User is assigned to project").status(false).build();
        }
        if (!projectUser.get().getIsOwner()) {
            return ProjectDeleteResponseDTO.builder().information("User is not a owner of project").status(false).build();
        }
        Long id = projectToDelete.get().getId();
        projectUserRepository.delete(projectUser.get());
        projectRepository.delete(projectUser.get().getProject());
        return ProjectDeleteResponseDTO.builder().information("Successfully").status(true).projectId(id).build();
    }
}
