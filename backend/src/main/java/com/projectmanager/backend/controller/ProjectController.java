package com.projectmanager.backend.controller;

import com.projectmanager.backend.domain.Project;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.backend.dto.response.ProjectCreateResponseDTO;
import com.projectmanager.backend.dto.response.ProjectDeleteResponseDTO;
import com.projectmanager.backend.dto.response.ProjectIdResponseDTO;
import com.projectmanager.backend.dto.response.ProjectsResponseDTO;
import com.projectmanager.backend.dto.request.ProjectCreateRequestDTO;
import com.projectmanager.backend.repository.ProjectUserRepository;
import com.projectmanager.backend.repository.ProjectRepository;
import com.projectmanager.backend.repository.UserRepository;
import com.projectmanager.backend.service.ProjectService;

import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController("ProjectController")
@Validated
@RequestMapping("api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<ProjectCreateResponseDTO> createProject(@Valid @RequestBody ProjectCreateRequestDTO request) {
        ProjectCreateResponseDTO response = projectService.createProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectIdResponseDTO> getMethodName(@PathVariable Long projectId) {
        ProjectIdResponseDTO response = projectService.getProjectById(projectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<ProjectsResponseDTO> getProjects() {
        ProjectsResponseDTO response = projectService.getProjects();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProjectDeleteResponseDTO> deleteProject(@Valid @PathVariable Long projectId) {
        ProjectDeleteResponseDTO response = projectService.deleteProject(projectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
