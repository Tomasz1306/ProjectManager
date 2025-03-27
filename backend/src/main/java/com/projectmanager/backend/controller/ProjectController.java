package com.projectmanager.backend.controller;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.entity.Position;
import com.projectmanager.backend.entity.Project;
import com.projectmanager.backend.entity.ProjectPerson;
import com.projectmanager.backend.entity.ProjectPersonId;
import com.projectmanager.backend.entity.ProjectLog;
import com.projectmanager.backend.repository.PersonRepository;
import com.projectmanager.backend.repository.PositionRepository;
import com.projectmanager.backend.repository.ProjectLogRepository;
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

    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;
    private final ProjectPersonRepository projectPersonRepository;
    private final ProjectLogRepository projectLogRepository;
    private final PositionRepository positionRepository;

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
    private static class CreateProjectResponse {
        boolean status;
        String projectName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class CompleteProjectResponse {
        Optional<Project> project;
        Optional<Person> person;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class ProjectsResponse {
        List<Project> projects;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class ProjectLogsResponse {
        List<ProjectLog> projectLogs;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class PositionInfo {
        Integer id;
        Integer personid;
        Integer projectid;
        String name;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class PeopleResponse {
        List<ProjectPerson> people;
        List<PositionInfo> positions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class AddPersonResponse {
        boolean status;
        ProjectPerson person;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class AddPersonRequest {
        String email;
        Integer projectId;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class DeletePersonResponse {
        boolean status;
        Person deletedPerson;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class DeletePersonRequest {
        String deleteCallerEmail;
        Integer projectId;
        Integer personId;
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
    CompleteProjectResponse getCompleteProject(@PathVariable("id") Integer projectid) {
        Optional<Project> project = projectRepository.findById(projectid);
        if (project.isEmpty()) {
            return CompleteProjectResponse.builder().build();
        }
        Optional<Person> creator = personRepository.findById(project.get().getCreatorid());
        if (creator.isEmpty()) {
            return CompleteProjectResponse.builder().build();
        }
        // ADD REST OF PROJECT INFORMATION LIKE ISSUES LOGS ECT...
        return CompleteProjectResponse.builder()
                .person(creator)
                .project(project)
                .build();
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

    @JsonIgnore
    @SuppressWarnings("preview")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/projects", params = "email")
    ProjectsResponse getProjectsByCreatorId(String email) {
        Person person = personRepository.findByEmail(email);
        List<ProjectPerson> projectPerson = projectPersonRepository.findById_Personid(person.getId());
        List<Optional<Project>> optionalProjects = new ArrayList<>();
        for (int i = 0; i < projectPerson.size(); i++) {
            optionalProjects.add(projectRepository.findById(projectPerson.get(i).getProjectid().getId()));
        }

        List<Project> projects = new ArrayList<>();
        for (int i = 0; i < optionalProjects.size(); i++) {
            if (optionalProjects.get(i).isPresent()) {
                System.out.println(optionalProjects.get(i).get().getName());
                projects.add(optionalProjects.get(i).get());
            }
        }
        System.out.println(projects.getFirst());
        return ProjectsResponse.builder().projects(projects).build();
    }

    @SuppressWarnings("preview")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/createProject")
    CreateProjectResponse createProject(@RequestBody createProjectRequest request) {
        if (!projectRepository.findByName(request.name).isEmpty()) {
            System.console().printf("Project with that name exists: ");
            return CreateProjectResponse.builder()
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
        ProjectPersonId projectPersonId = ProjectPersonId.builder()
                .personid(person.getId())
                .projectid(project.getId())
                .build();

        ProjectPerson projectPerson = ProjectPerson.builder()
                .personid(person)
                .projectid(project)
                .id(projectPersonId)
                .role("ADMIN")
                .build();
        ProjectPerson savedProjectPerson = projectPersonRepository.save(projectPerson);

        return CreateProjectResponse.builder()
                .status(true)
                .projectName(request.name)
                .build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/projectLogs/{id}")
    ProjectLogsResponse getProjectLogs(@PathVariable("id") Integer projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            List<ProjectLog> projectLogs = projectLogRepository.findByProjectid_Id(project.get().getId());
            return ProjectLogsResponse.builder().projectLogs(projectLogs).build();
        }
        return ProjectLogsResponse.builder().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/projectPeople/{id}")
    PeopleResponse getMethodName(@PathVariable("id") Integer projectid) {
        List<ProjectPerson> projectPersons = projectPersonRepository.findById_Projectid(projectid);
        List<PositionInfo> positions = new LinkedList<>();
        for (int i = 0; i < projectPersons.size(); i++) {
            List<Position> position = positionRepository.findByProjectPersonid(projectPersons.get(i));
            List<PositionInfo> positionsInfo = new LinkedList<>();
            for (int j = 0; j < position.size(); j++) {
                PositionInfo positionInfo = PositionInfo
                .builder()
                .id(position.get(j).getId())
                .name(position.get(j).getName())
                .personid(position.get(j).getProjectPersonid().getPersonid().getId())
                .projectid(position.get(j).getProjectPersonid().getProjectid().getId())
                .build();
                positionsInfo.add(positionInfo);
            }
            positions.addAll(positionsInfo);
        }
        return PeopleResponse.builder().people(projectPersons).positions(positions).build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/project/addPerson")
    AddPersonResponse addPersonToProject(@RequestBody AddPersonRequest request) {
        Person person = personRepository.findByEmail(request.email);
        Optional<Project> project = projectRepository.findById(request.projectId);
        ProjectPersonId newProjectPersonId = ProjectPersonId
                .builder()
                .projectid(project.get().getId())
                .personid(person.getId())
                .build();
        ProjectPerson newProjectPerson = ProjectPerson.builder()
                .projectid(project.get())
                .personid(person)
                .role("MEMBER")
                .id(newProjectPersonId)
                .build();
        ProjectPerson addedProjectPerson = projectPersonRepository.save(newProjectPerson);
        return AddPersonResponse.builder().status(true).person(addedProjectPerson).build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/project/deletePerson")
    @Transactional
    DeletePersonResponse deletePerson(@RequestBody DeletePersonRequest request) {
        Person personDeleteCaller = personRepository.findByEmail(request.deleteCallerEmail);
        Optional<Project> currentProject = projectRepository.findById(request.projectId);
        Optional<Person> personToDelete = personRepository.findById(request.personId);
        Optional<ProjectPerson> projectPersonDeleteCaller = projectPersonRepository
                .findById_ProjectidAndId_Personid(request.projectId, personDeleteCaller.getId());
        Optional<ProjectPerson> projectPersonToDelete = projectPersonRepository.findById_ProjectidAndId_Personid(request.projectId, request.personId);
        List<Position> positions = positionRepository.findByProjectPersonid(projectPersonToDelete.get());
        for (int i = positions.size() -1 ; i >= 0 ; i--) {
            positionRepository.deleteById(positions.get(i).getId());
        } 

        if (personDeleteCaller.getId() == currentProject.get().getCreatorid()
                || projectPersonDeleteCaller.get().getRole().equals("ADMIN")) {
            projectPersonRepository.deleteById_ProjectidAndId_Personid(request.projectId, request.personId);
            Optional<ProjectPerson> projectPersonCheck = projectPersonRepository
                    .findById_ProjectidAndId_Personid(request.projectId, request.personId);
            if (projectPersonCheck.isEmpty()) {
                return DeletePersonResponse.builder().status(true).deletedPerson(personToDelete.get()).build();
            }
        }
        return DeletePersonResponse.builder().status(false).build();
    }
}
