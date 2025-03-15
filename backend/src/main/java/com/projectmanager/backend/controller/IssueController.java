package com.projectmanager.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.projectmanager.backend.entity.Issue;
import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.repository.IssueRepository;
import com.projectmanager.backend.exception.IssueNotFoundException;
import com.projectmanager.backend.exception.PersonNotFoundException;

@RestController
public class IssueController {

    @Autowired
    private final IssueRepository repository;

    IssueController(IssueRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/issues")
    List<Issue> getAllIssues() {
        return repository.findAll();
    }

    @GetMapping("/issue/{id}")
    Issue getIssueById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new IssueNotFoundException(id));
    }

    @GetMapping(path = "/issue", params = "name")
    List<Issue> getIssueByName(String name) {
        return repository.findByName(name);
    }

    @GetMapping(path = "/issue", params = "description")
    List<Issue> getIssueByDescription(String description) {
        return repository.findByDescription(description);
    }

    @GetMapping(path = "/issue", params = "createdate")
    List<Issue> getIssueByCreateDate(Instant createDate) {
        return repository.findByCreatedate(createDate);
    }

    @GetMapping(path = "/issue", params = "dudate")
    List<Issue> getIssueByDueDate(Instant dueDate) {
        return repository.findByDuedate(dueDate);
    }

    @GetMapping(path = "/issue", params = "status")
    List<Issue> getIssueByStatus(String status) {
        return repository.findByStatus(status);
    }

    @GetMapping(path = "/issue", params = "priority")
    List<Issue> getIssueByPriority(String priority) {
        return repository.findByPriority(priority);
    }

    @GetMapping(path = "/issue", params = "type")
    List<Issue> getIssueByType(String type) {
        return repository.findByType(type);
    }

}
