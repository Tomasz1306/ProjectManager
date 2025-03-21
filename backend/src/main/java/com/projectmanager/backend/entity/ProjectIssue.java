package com.projectmanager.backend.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="project_issue")
public class ProjectIssue {
    @EmbeddedId
    private ProjectIssueId id;

    @MapsId("issueid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "issueid", nullable = false)
    private Issue issueid;

    @MapsId("projectid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "projectid", nullable = false)
    private Project projectid;

    public ProjectIssueId getId() {
        return id;
    }

    public void setId(ProjectIssueId id) {
        this.id = id;
    }

    public Issue getIssueid() {
        return issueid;
    }

    public void setIssue(Issue issueid) {
        this.issueid = issueid;
    }

    public Project getProjectid() {
        return projectid;
    }

    public void setProjectid(Project projectid) {
        this.projectid = projectid;
    }
}
