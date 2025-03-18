package com.projectmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.exception.PersonNotFoundException;
import com.projectmanager.backend.repository.PersonRepository;

@RestController
public class PersonController {

    @Autowired
    private final PersonRepository repository;

    PersonController(PersonRepository repository) {
        this.repository = repository;
    }

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

    @GetMapping(path = "/person", params = "email")
    Person findPersonByEmail(String email) {
        return repository.findByEmail(email);
    }

}
