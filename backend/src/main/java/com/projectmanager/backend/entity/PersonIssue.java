package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "person_issue")
public class PersonIssue {
    @EmbeddedId
    private PersonIssueId id;

    @MapsId("personid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "personid", nullable = false)
    private Person personid;

    @MapsId("issueid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "issueid", nullable = false)
    private Issue issueid;

    public PersonIssueId getId() {
        return id;
    }

    public void setId(PersonIssueId id) {
        this.id = id;
    }

    public Person getPersonid() {
        return personid;
    }

    public void setPersonid(Person personid) {
        this.personid = personid;
    }

    public Issue getIssueid() {
        return issueid;
    }

    public void setIssueid(Issue issueid) {
        this.issueid = issueid;
    }

}