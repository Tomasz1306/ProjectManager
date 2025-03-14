package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @ColumnDefault("nextval('project_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "startdate", nullable = false)
    private Instant startdate;

    @Column(name = "duedate", nullable = false)
    private Instant duedate;

    @Column(name = "creatorid", nullable = false)
    private Integer creatorid;

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