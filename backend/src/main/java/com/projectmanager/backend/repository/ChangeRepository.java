package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Change;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChangeRepository extends JpaRepository<Change, Integer> {
    
}
