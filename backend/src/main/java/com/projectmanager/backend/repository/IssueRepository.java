package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Integer>{
    
}
