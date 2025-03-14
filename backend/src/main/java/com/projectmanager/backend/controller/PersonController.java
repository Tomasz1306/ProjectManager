package com.projectmanager.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.projectmanager.backend.entity.Person;
import com.projectmanager.backend.repository.AttachamentRepository;
import com.projectmanager.backend.repository.PersonRepository;

@RestController
public class PersonController {

    private final PersonRepository repository;

    PersonController(PersonRepository repository, AttachamentRepository attachamentRepository) {
        this.repository = repository;
    }

    @GetMapping("/persons") 
    List<Person> all() {
        return repository.findAll(); 
    }

    @PostMapping("/person")
    Person newPerson(@RequestBody Person newPerson) { 
        return repository.save(newPerson);
    } 

    // @GetMapping("/person/{id}")
    // Person one(@PathVariable String id) {
    //     return repository.findById(id).
    //     orElseThrow(() -> new PersonNotFoundException(id));
    // }

    @GetMapping("/person/{username}")
    Person one(@PathVariable String username) {
        return repository.findByUsername(username);
    }

    // @PutMapping("/person/{id}")
    // Person 

}
