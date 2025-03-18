package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.util.Objects;

import org.hibernate.Hibernate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Embeddable
public class PersonPositionId implements java.io.Serializable {
    @Serial
    private static final long serialVersionUID = -4242243162977851376L;
    @Column(name = "personid", nullable = false, length = Integer.MAX_VALUE)
    private Integer personid;

    @Column(name = "positionid", nullable = false)
    private Integer positionid;

    
    public Integer getPersonid() {
        return personid;
    }

    public void setPersonid(Integer personid) {
        this.personid = personid;
    }

    public Integer getPositionid() {
        return positionid;
    }

    public void setPositionid(Integer positionid) {
        this.positionid = positionid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PersonPositionId entity = (PersonPositionId) o;
        return Objects.equals(this.positionid, entity.positionid) &&
                Objects.equals(this.personid, entity.personid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(positionid, personid);
    }
}
