package com.projectmanager.backend.entity;

import java.util.Objects;

import org.hibernate.Hibernate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Embeddable
public class ProjectIssueId implements java.io.Serializable {
    private static final long serialVersionUID = -4280631241589405326L;
    @Column(name = "projectid", nullable = false, length = Integer.MAX_VALUE)
    private Integer projectid;

    @Column(name = "issueid", nullable = false)
    private Integer issueid;

    public Integer getProjectid() {
        return projectid;
    }

    public void setProjectid(Integer projectid) {
        this.projectid = projectid;
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
        ProjectIssueId entity = (ProjectIssueId) o;
        return Objects.equals(this.projectid, entity.projectid) &&
                Objects.equals(this.issueid, entity.issueid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectid, issueid);
    }
}
