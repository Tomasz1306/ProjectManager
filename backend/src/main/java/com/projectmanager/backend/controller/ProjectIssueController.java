package com.projectmanager.backend.controller;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.backend.entity.Issue;
import com.projectmanager.backend.entity.ProjectIssue;
import com.projectmanager.backend.repository.IssueRepository;
import com.projectmanager.backend.repository.ProjectIssueRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
@NoArgsConstructor
public class ProjectIssueController {

    @Autowired
    private ProjectIssueRepository projectIssueRepository;
    @Autowired
    private IssueRepository issueRepository;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class projectIssuesResponse {
        List<Issue> issues;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "projectIssues/{id}")
    projectIssuesResponse getProjectIssues(@PathVariable("id") Integer projectid) {
        List<ProjectIssue> projectIssues = projectIssueRepository.findById_Projectid(projectid);
        List<Issue> issues = new LinkedList<>();
        for (int i = 0; i < projectIssues.size(); i++) {
            Optional<Issue> issue = issueRepository.findById(projectIssues.get(i).getIssueid().getId());
            if (issue.isPresent()) {
                issues.add(issue.get());
            }
        }
        return projectIssuesResponse.builder().issues(issues).build();
    }
}
