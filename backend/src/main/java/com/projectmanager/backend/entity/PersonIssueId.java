package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class PersonIssueId implements java.io.Serializable {
    private static final long serialVersionUID = -4042883162971001326L;
    @Column(name = "personid", nullable = false, length = Integer.MAX_VALUE)
    private String personid;

    @Column(name = "issueid", nullable = false)
    private Integer issueid;

    public String getPersonid() {
        return personid;
    }

    public void setPersonid(String personid) {
        this.personid = personid;
    }

    public Integer getIssueid() {
        return issueid;
    }

    public void setIssueid(Integer issueid) {
        this.issueid = issueid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PersonIssueId entity = (PersonIssueId) o;
        return Objects.equals(this.issueid, entity.issueid) &&
                Objects.equals(this.personid, entity.personid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(issueid, personid);
    }

}