package com.projectmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectmanager.backend.entity.Position;

public interface PositionRepository extends JpaRepository<Position, Integer>{
    
}
