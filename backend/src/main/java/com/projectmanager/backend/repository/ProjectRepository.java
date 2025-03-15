package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.Instant;



public interface ProjectRepository extends JpaRepository<Project, Integer>{
    List<Project> findByName(String name);
    List<Project> findByDescription(String description);
    List<Project> findByStartdate(Instant startdate);
    List<Project> findByDuedate(Instant duedate);
    List<Project> findByCreatorid(Integer creatorid);
}
