package com.projectmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectmanager.backend.entity.Position;
import com.projectmanager.backend.entity.ProjectPerson;

import java.util.List;


public interface PositionRepository extends JpaRepository<Position, Integer>{
    List<Position> findByProjectPersonid(ProjectPerson projectPersonid);
}
