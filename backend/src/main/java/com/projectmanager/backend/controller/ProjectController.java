package com.projectmanager.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.entity.Project;
import com.projectmanager.backend.entity.ProjectPerson;
import com.projectmanager.backend.entity.ProjectPersonId;
import com.projectmanager.backend.repository.PersonRepository;
import com.projectmanager.backend.repository.ProjectPersonRepository;
import com.projectmanager.backend.repository.ProjectRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProjectController {

    @Autowired
    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;
    private final ProjectPersonRepository projectPersonRepository;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class createProjectRequest {
        String name;
        String email;
        String description;
        String[] people;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class createProjectResponse {
        boolean status;
        String projectName;
    }

    @GetMapping("/projects")
    List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/project/{id}")
    Optional<Project> getProjectById(@PathVariable Integer id) {
        return projectRepository.findById(id);
    }

    @GetMapping(path = "/project", params = "description")
    List<Project> getProjectByDescritpion(String description) {
        return projectRepository.findByDescription(description);
    }

    @GetMapping(path = "/project", params = "startdate")
    List<Project> getProjectByStartDate(Instant startDate) {
        return projectRepository.findByStartdate(startDate);
    }

    @GetMapping(path = "/project", params = "duedate")
    List<Project> getProjectByDueDate(Instant duedate) {
        return projectRepository.findByDuedate(duedate);
    }

    @GetMapping(path = "/project", params = "createid")
    List<Project> getProjectByName(Integer createid) {
        return projectRepository.findByCreatorid(createid);
    }

    @SuppressWarnings("preview")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/createProject")
    createProjectResponse createProject(@RequestBody createProjectRequest request) {
        if (!projectRepository.findByName(request.name).isEmpty()) {
            System.console().printf("Project with that name exists: ");
            return createProjectResponse.builder()
                    .status(false)
                    .projectName(request.name).build();
        }

        Person person = personRepository.findByEmail(request.email);
        Project project = Project.builder()
                .name(request.name)
                .description(request.description)
                .creatorid(person.getId())
                .build();
        Project savedProject = projectRepository.save(project);
        if (savedProject == null) {
            System.console().printf("Cannot save project");
            return createProjectResponse.builder()
                    .status(false)
                    .projectName(request.name).build();
        }
        ProjectPersonId projectPersonId = ProjectPersonId.builder()
                .personid(person.getId())
                .projectid(project.getId())
                .build();

        ProjectPerson projectPerson = ProjectPerson.builder()
                .personid(person)
                .projectid(project)
                .id(projectPersonId)
                .build();
        ProjectPerson savedProjectPerson = projectPersonRepository.save(projectPerson);
        if (savedProjectPerson == null) {
            System.console().printf("Cannot save project/person");
            return createProjectResponse.builder()
                    .status(false)
                    .projectName(request.name).build();
        }

        return createProjectResponse.builder()
                .status(true)
                .projectName(request.name)
                .build();

    }
}
