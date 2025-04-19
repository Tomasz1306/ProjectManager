package com.projectmanager.backend.controller;

import com.projectmanager.backend.dto.request.*;
import com.projectmanager.backend.dto.response.*;
import com.projectmanager.backend.service.ProjectUserService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController("ProjectController")
@Validated
@RequestMapping("api/v1/projects")
public class ProjectController {

    private final ProjectUserService projectService;

    public ProjectController(ProjectUserService projectService) {
        this.projectService = projectService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/create")
    public ResponseEntity<ProjectCreateResponseDTO> createProject(@Valid @RequestBody ProjectCreateRequestDTO request) {
        ProjectCreateResponseDTO response = projectService.createProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<ProjectIdResponseDTO> getProjectById(@PathVariable("id") Long projectId) {
        ProjectIdResponseDTO response = projectService.getProjectById(projectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}/{projectId}")
    public ResponseEntity<ProjectUserResponseDTO> getUserProject(@PathVariable("userId") Long userId, @PathVariable("projectId") Long projectId) {
        ProjectUserResponseDTO response = projectService.getUserProject(userId, projectId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping()
    public ResponseEntity<ProjectsResponseDTO> getProjects() {
        ProjectsResponseDTO response = projectService.getProjects();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/userProjects/{id}")
    public ResponseEntity<ProjectsResponseDTO> getUserProjects(@PathVariable("id") Long userId) {
        ProjectsResponseDTO response = projectService.getUserProjects(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/projectUsers")
    public ResponseEntity<ProjectUsersResponseDTO> getProjectUsers(@RequestBody ProjectUsersRequestDTO request) {
        ProjectUsersResponseDTO response = projectService.getProjectUsers(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/delete")
    public ResponseEntity<ProjectDeleteResponseDTO> deleteProject(@Valid @RequestBody ProjectDeleteRequestDTO request) {
        ProjectDeleteResponseDTO response = projectService.deleteProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addUser")
    public ResponseEntity<AddUserToProjectResponseDTO> addUserToProject(@Valid @RequestBody AddUserToProjectRequestDTO request) {
        AddUserToProjectResponseDTO response = projectService.addUserToProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/deleteUser")
    public ResponseEntity<ProjectDeleteUserResponseDTO> deleteUserFromProject(@Valid @RequestBody ProjectDeleteUserRequestDTO request) {
        ProjectDeleteUserResponseDTO response = projectService.deleteUserFromProject(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/updateUser")
    public ResponseEntity<ProjectUpdateUserResponseDTO> updateProjectUser(@Valid @RequestBody ProjectUpdateUserRequestDTO request) {
        System.out.println(request);
        ProjectUpdateUserResponseDTO response = projectService.updateProjectUser(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
