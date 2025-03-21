package com.projectmanager.backend.controller;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.exception.PersonNotFoundException;
import com.projectmanager.backend.repository.PersonRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Data;



@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PersonController {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class PersonRequest {
    private String email;
}

    @Autowired
    private final PersonRepository repository;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/persons")
    List<Person> all() {
        return repository.findAll();
    }

    @PostMapping("/person")
    Person newPerson(@RequestBody Person newPerson) {
        return repository.save(newPerson);
    }

    @GetMapping("/person/{id}")
    Person one(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new PersonNotFoundException(id));
    }

    @GetMapping(path = "/person", params = "name")
    Person findPersonByName(String name) {
        return repository.findByName(name);
    }

    // @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping(path = "/person", params = "email")
    Person findPersonByEmail(String email) {
        return repository.findByEmail(email);
    }

    // @CrossOrigin(origins = "http://localhost:3000")
    // @PostMapping(path ="/findPerson")
    // List<Person> findPersonsByNameKey(@RequestBody String key) {
    //     return repository.findBynameStartingWith(key);
    // }

    @SuppressWarnings("preview")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/findPerson")
    List<Person> findPersonByEmailKey(@RequestBody PersonRequest key) {
        // System.console().printf(key.email);
        return repository.findByEmailStartingWith(key.email);        
    }
}
