package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.Instant;


public interface IssueRepository extends JpaRepository<Issue, Integer> {
    List<Issue> findByName(String name);
    List<Issue> findByDescription(String name);
    List<Issue> findByCreatedate(Instant createdate);
    List<Issue> findByDuedate(Instant duedate);
    List<Issue> findByStatus(String status);
    List<Issue> findByPriority(String priority);
    List<Issue> findByType(String type);
}
