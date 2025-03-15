package com.projectmanager.backend.exception;

public class IssueNotFoundException extends RuntimeException {
    public IssueNotFoundException(Integer id) {
        super("Could not find Issue: " + id);
    }

    public IssueNotFoundException(String name) {
        super("Could not find Issue: " + name);
    }
}
