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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person_position")
public class PersonPosition {
    @EmbeddedId
    private PersonPositionId id;

    @MapsId("personid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="personid", nullable = false)
    private Person personid;

    @MapsId("positionid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "positionid", nullable = false)
    private Position positionid;

    public PersonPositionId getId() {
        return id;
    }

    public void setId(PersonPositionId id) {
        this.id = id;
    }

    public Person getPersonid() {
        return personid;
    }

    public void setPersonid(Person personid) {
        this.personid = personid;
    }

    public Position getPosition() {
        return positionid;
    }

    public void setPositionid(Position positionid) {
        this.positionid = positionid;
    }
    
}
