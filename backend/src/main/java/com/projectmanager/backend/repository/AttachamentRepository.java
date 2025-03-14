package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Attachament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachamentRepository extends JpaRepository<Attachament, Integer>{
    
}
