package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class AuthenticatorId implements java.io.Serializable {
    private static final long serialVersionUID = -697464493962450917L;
    @Column(name = "userid", nullable = false, length = Integer.MAX_VALUE)
    private String userid;

    @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
    private String id;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AuthenticatorId entity = (AuthenticatorId) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.userid, entity.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userid);
    }

}