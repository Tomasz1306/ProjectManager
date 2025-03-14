package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Projectlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLogRepository extends JpaRepository<Projectlog, Integer>{
    
}
