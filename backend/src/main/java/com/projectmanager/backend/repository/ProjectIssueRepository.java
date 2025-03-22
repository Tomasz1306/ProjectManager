package com.projectmanager.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectmanager.backend.entity.ProjectIssue;
import com.projectmanager.backend.entity.ProjectIssueId;

public interface ProjectIssueRepository extends JpaRepository<ProjectIssue, ProjectIssueId>{
    List<ProjectIssue> findById_Projectid(Integer projectid);
}
