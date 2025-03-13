package com.projectmanager.backend.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Project")
public class Project {
    private String name;
    private String description;
    private Date startDate;
    private Date dueDate;
    private int creatorId;

    @OneToMany(mappedBy = "project")
    private List<ProjectLog> projectLogs;
}
