package com.projectmanager.backend.controller;

import java.io.Console;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectmanager.backend.entity.Issue;
import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.entity.PersonIssue;
import com.projectmanager.backend.repository.IssueRepository;
import com.projectmanager.backend.repository.PersonIssueRepository;
import com.projectmanager.backend.repository.PersonRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PersonIssueController {
    
    @Autowired
    private PersonIssueRepository personIssueRepository;
    @Autowired
    private IssueRepository issueRepository;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class personIssuesResponse {
        List<Issue> issues;
    }
    
    @JsonIgnore
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/personIssues/{id}")
    personIssuesResponse getPersonIssues(@PathVariable("id") Integer personid) {
        List<PersonIssue> personIssue = personIssueRepository.findById_Personid(personid);
        List<Issue> issues = new LinkedList<>();
        for (int i = 0; i < personIssue.size(); i++) {
            Optional<Issue> issue = issueRepository.findById(personIssue.get(i).getId().getIssueid());
            if (issue.isPresent()) {
                issues.add(issue.get());
                // System.out.println(issue.get());
            }
        }
        System.out.println(issues.getFirst());
        return personIssuesResponse.builder().issues(issues).build();
    }
}
