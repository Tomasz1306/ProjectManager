package com.projectmanager.backend.exception;

public class PersonNotFoundException extends RuntimeException{
    public PersonNotFoundException(String id) {
        super("Could not find Person " + id);
    }
}
