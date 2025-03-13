package com.projectmanager.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.*;

@Entity
@Table(name = "User")
public class User {
    private String name;
    private String username;
    private String password;
    private String email;
    private Date emailVerified;
    private String image;

    @ManyToMany
    @JoinTable(
        name = "usersIssues",
        joinColumns = @JoinColumn(name = "id"),
        inverseJoinColumns = @JoinColumn(name = "issueId")
    )
    private Set<Issue> issues = new HashSet<>();
}
