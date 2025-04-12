package com.projectmanager.backend.repository;

import com.projectmanager.backend.domain.Project;
import com.projectmanager.backend.domain.ProjectUser;

import com.projectmanager.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long>{
    Optional<ProjectUser> findByProjectAndUser(Project project, User user);
    List<ProjectUser> findByUser(User user);
    List<ProjectUser> findByProject(Project project);
}
