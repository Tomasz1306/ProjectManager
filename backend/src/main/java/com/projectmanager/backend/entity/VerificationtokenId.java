package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class VerificationtokenId implements java.io.Serializable {
    private static final long serialVersionUID = 8505244029354283041L;
    @Column(name = "identifier", nullable = false, length = Integer.MAX_VALUE)
    private String identifier;

    @Column(name = "token", nullable = false, length = Integer.MAX_VALUE)
    private String token;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VerificationtokenId entity = (VerificationtokenId) o;
        return Objects.equals(this.identifier, entity.identifier) &&
                Objects.equals(this.token, entity.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(identifier, token);
    }

}