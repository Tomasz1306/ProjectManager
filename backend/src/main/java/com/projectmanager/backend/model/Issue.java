package com.projectmanager.backend.model;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Issue")
public class Issue {
    private String name;
    private String description;
    private Date createDate;
    private Date dueDate;
    private String status;
    private String priority;
    private String type;
    
    @OneToMany(mappedBy = "issue")
    private List<Attachment> attachments;

    @OneToMany(mappedBy = "issue")
    private List<Comment> comments;

    @OneToMany(mappedBy = "issue")
    private List<Note> notes;

    @OneToMany(mappedBy = "issue")
    private List<Tag> tags;

    @OneToMany(mappedBy = "issue")
    private List<Change> changes;

    @ManyToMany(mappedBy = "issues")
    private Set<User> users = new HashSet<>();
}
