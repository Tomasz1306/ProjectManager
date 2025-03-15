package com.projectmanager.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.backend.entity.Project;
import com.projectmanager.backend.repository.ProjectRepository;

@RestController
public class ProjectController {

    @Autowired
    private final ProjectRepository repository;

    ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/projects")
    List<Project> getAllProjects() {
        return repository.findAll();
    }

    @GetMapping("/project/{id}")
    Optional<Project> getProjectById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping(path = "/project", params = "description")
    List<Project> getProjectByDescritpion(String description) {
        return repository.findByDescription(description);
    }

    @GetMapping(path = "/project", params = "startdate")
    List<Project> getProjectByStartDate(Instant startDate) {
        return repository.findByStartdate(startDate);
    }

    @GetMapping(path = "/project", params = "duedate")
    List<Project> getProjectByDueDate(Instant duedate) {
        return repository.findByDuedate(duedate);
    }

    @GetMapping(path = "/project", params = "createid")
    List<Project> getProjectByName(Integer createid) {
        return repository.findByCreatorid(createid);
    }
}
