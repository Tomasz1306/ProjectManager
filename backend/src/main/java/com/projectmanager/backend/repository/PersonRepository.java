package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Person;

import java.time.Instant;

import org.springframework.data.jpa.repository.JpaRepository;

interface testProjection {
    String getId();
    String getName();
    String getUsername();
    String getEmail();
    Instant getEmailverified();
}

public interface PersonRepository extends JpaRepository<Person, String>{
    Person findByName(String name);  
    Person findByUsername(String username);  
}
