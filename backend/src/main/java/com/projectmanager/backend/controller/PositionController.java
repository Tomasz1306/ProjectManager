package com.projectmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.projectmanager.backend.entity.Position;
import com.projectmanager.backend.repository.PositionRepository;

@RestController
public class PositionController {

    @Autowired
    private final PositionRepository repository;

    PositionController(PositionRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin("origins = http://localhost:8080")
    @GetMapping("/positions")
    List<Position> getAllPositions() {
        return repository.findAll(); 
    }
    
}
