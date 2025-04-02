package com.projectmanager.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

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

@Service("ProjectService")
public class ProjectService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;

    public ProjectCreateResponseDTO createProject(ProjectCreateRequestDTO request) {
        Optional<Project> project = projectRepository.findByName(request.getName());
        if (project.isPresent()) {
            return ProjectCreateResponseDTO
                    .builder()
                    .information("Project with that name exists")
                    .status(false)
                    .build();
        }
        Project newProject = Project.builder().name(request.getName()).description(request.getDescription()).build();
        Project createdProject = projectRepository.save(newProject);
        return ProjectCreateResponseDTO.builder().information("Successful").status(false).projectId(newProject.getId()).build();
    }

    public ProjectService(UserRepository userRepository, ProjectRepository projectRepository, ProjectUserRepository projectUserRepository) {
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

    public ProjectDeleteResponseDTO deleteProject(Long projectId) {
        Optional<Project> projectToDelete = projectRepository.findById(projectId);
        if (projectToDelete.isEmpty()) {
            return ProjectDeleteResponseDTO.builder().information("Project not exists").status(false).build();
        }
        Long id = projectToDelete.get().getId();
        projectRepository.delete(projectToDelete.get());
        return ProjectDeleteResponseDTO.builder().information("Successful").status(true).projectId(id).build();
    }
}
