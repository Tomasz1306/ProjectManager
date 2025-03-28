package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "project_person")
public class ProjectPerson {
    @EmbeddedId
    private ProjectPersonId id;

    @MapsId("personid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "personid", nullable = false)
    // @JsonIgnore
    private Person personid;

    @MapsId("projectid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "projectid", nullable = false)
    // @JsonManagedReference
    // @JsonIgnore
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