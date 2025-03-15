package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    Person findByName(String name);

    Person findByUsername(String username);

    Person findByEmail(String email);
}
