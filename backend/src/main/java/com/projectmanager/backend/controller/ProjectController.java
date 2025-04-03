package com.projectmanager.backend.controller;

import com.projectmanager.backend.dto.request.ProjectDeleteRequestDTO;
import com.projectmanager.backend.service.ProjectUserService;
import jakarta.validation.Valid;

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

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController("ProjectController")
@Validated
@RequestMapping("api/v1/projects")
public class ProjectController {

    private final ProjectUserService projectService;

    public ProjectController(ProjectUserService projectService) {
        this.projectService = projectService;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<ProjectCreateResponseDTO> createProject(@Valid @RequestBody ProjectCreateRequestDTO request) {
        ProjectCreateResponseDTO response = projectService.createProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectIdResponseDTO> getMethodName(@PathVariable Long projectId) {
        ProjectIdResponseDTO response = projectService.getProjectById(projectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<ProjectsResponseDTO> getProjects() {
        ProjectsResponseDTO response = projectService.getProjects();
        System.out.println("RESPONSE: " + response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<ProjectDeleteResponseDTO> deleteProject(@Valid @RequestBody ProjectDeleteRequestDTO request) {
        ProjectDeleteResponseDTO response = projectService.deleteProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
