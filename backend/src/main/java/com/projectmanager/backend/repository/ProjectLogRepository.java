package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Project;
import com.projectmanager.backend.entity.ProjectLog;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLogRepository extends JpaRepository<ProjectLog, Integer>{
    List<ProjectLog> findByProjectid_Id(Integer projectId);
}
