package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "session")
public class Session {
    @Id
    @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userid", nullable = false)
    private Person userid;

    @Column(name = "expires", nullable = false)
    private Instant expires;

    @ColumnDefault("now()")
    @Column(name = "createdat", nullable = false)
    private Instant createdat;

    @ColumnDefault("now()")
    @Column(name = "updatedat", nullable = false)
    private Instant updatedat;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Person getUserid() {
        return userid;
    }

    public void setUserid(Person userid) {
        this.userid = userid;
    }

    public Instant getExpires() {
        return expires;
    }

    public void setExpires(Instant expires) {
        this.expires = expires;
    }

    public Instant getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Instant createdat) {
        this.createdat = createdat;
    }

    public Instant getUpdatedat() {
        return updatedat;
    }

    public void setUpdatedat(Instant updatedat) {
        this.updatedat = updatedat;
    }

}