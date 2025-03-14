package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class ProjectPersonId implements java.io.Serializable {
    private static final long serialVersionUID = -4280631247127405716L;
    @Column(name = "personid", nullable = false, length = Integer.MAX_VALUE)
    private String personid;

    @Column(name = "projectid", nullable = false)
    private Integer projectid;

    public String getPersonid() {
        return personid;
    }

    public void setPersonid(String personid) {
        this.personid = personid;
    }

    public Integer getProjectid() {
        return projectid;
    }

    public void setProjectid(Integer projectid) {
        this.projectid = projectid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProjectPersonId entity = (ProjectPersonId) o;
        return Objects.equals(this.personid, entity.personid) &&
                Objects.equals(this.projectid, entity.projectid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(personid, projectid);
    }

}