package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
// @ToString(exclude = "projectPersons")
@Table(name = "project")
public class Project {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "startdate")
    private Instant startdate;

    @Column(name = "duedate")
    private Instant duedate;

    @Column(name = "creatorid", nullable = false)
    private Integer creatorid;

    // @JsonBackReference
    // @JsonIgnore
    // @OneToMany(mappedBy = "projectid", fetch = FetchType.EAGER)
    // List<ProjectPerson> projectPersons;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStartdate() {
        return startdate;
    }

    public void setStartdate(Instant startdate) {
        this.startdate = startdate;
    }

    public Instant getDuedate() {
        return duedate;
    }

    public void setDuedate(Instant duedate) {
        this.duedate = duedate;
    }

    public Integer getCreatorid() {
        return creatorid;
    }

    public void setCreatorid(Integer creatorid) {
        this.creatorid = creatorid;
    }

}