package com.projectmanager.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.hibernate.internal.build.AllowNonPortable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        String status;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class createProjectResponse {
        boolean status;
        String projectName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class  completeProjectResponse {
        Optional<Project> project;
        Optional<Person> person;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/projects")
    List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/project/{id}")
    Optional<Project> getProjectById(@PathVariable Integer id) {
        return projectRepository.findById(id);
    }

    @SuppressWarnings("preview")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/completeProject/{id}")
    completeProjectResponse getCompleteProject(@PathVariable("id") Integer projectid) {
        System.console().println("GET COMPLETE PROJECT");
        Optional<Project> project = projectRepository.findById(projectid);
        if (project.isEmpty()) {
            return completeProjectResponse.builder().build();
        }
        Optional<Person> creator = personRepository.findById(project.get().getCreatorid());
        if (creator.isEmpty()) {
            return completeProjectResponse.builder().build();
        }
        // ADD REST OF PROJECT INFORMATION LIKE ISSUES LOGS ECT...
        return completeProjectResponse.builder()
                                    .person(creator)
                                    .project(project)
                                    .build();
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

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/deleteProject/{id}")
    ResponseEntity<Project> deleteProjectById(@PathVariable("id") Integer projectId) {
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isPresent()) {
            projectRepository.deleteById(projectId);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/projects", params = "email")
    List<Project> getProjectsByCreatorId(String email) {
        Person person = personRepository.findByEmail(email);
        return projectRepository.findByCreatorid(person.getId());
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
                .status(request.status)
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
