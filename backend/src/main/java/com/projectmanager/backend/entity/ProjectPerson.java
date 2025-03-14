package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "project_person")
public class ProjectPerson {
    @EmbeddedId
    private ProjectPersonId id;

    @MapsId("personid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "personid", nullable = false)
    private Person personid;

    @MapsId("projectid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "projectid", nullable = false)
    private Project projectid;

    public ProjectPersonId getId() {
        return id;
    }

    public void setId(ProjectPersonId id) {
        this.id = id;
    }

    public Person getPersonid() {
        return personid;
    }

    public void setPersonid(Person personid) {
        this.personid = personid;
    }

    public Project getProjectid() {
        return projectid;
    }

    public void setProjectid(Project projectid) {
        this.projectid = projectid;
    }

}