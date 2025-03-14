package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, String> {
    
}
