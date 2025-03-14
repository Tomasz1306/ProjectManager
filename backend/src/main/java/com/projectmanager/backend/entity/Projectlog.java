package com.projectmanager.backend.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "projectlog")
public class Projectlog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "projectlog_id_gen")
    @SequenceGenerator(name = "projectlog_id_gen", sequenceName = "projectlog_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "projectlogdate", nullable = false)
    private Instant projectlogdate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "projectid", nullable = false)
    private Project projectid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getProjectlogdate() {
        return projectlogdate;
    }

    public void setProjectlogdate(Instant projectlogdate) {
        this.projectlogdate = projectlogdate;
    }

    public Project getProjectid() {
        return projectid;
    }

    public void setProjectid(Project projectid) {
        this.projectid = projectid;
    }

}