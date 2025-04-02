package com.projectmanager.backend.repository;

import com.projectmanager.backend.domain.ProjectUser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long>{
    
}
