package com.projectmanager.backend.repository;

import java.util.Optional;

import com.projectmanager.backend.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findById(Long id);
    Optional<Project> findByName(String name);
}
