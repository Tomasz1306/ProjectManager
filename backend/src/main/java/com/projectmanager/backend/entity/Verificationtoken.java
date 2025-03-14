package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "verificationtoken")
public class Verificationtoken {
    @EmbeddedId
    private VerificationtokenId id;

    @Column(name = "expires", nullable = false)
    private Instant expires;

    public VerificationtokenId getId() {
        return id;
    }

    public void setId(VerificationtokenId id) {
        this.id = id;
    }

    public Instant getExpires() {
        return expires;
    }

    public void setExpires(Instant expires) {
        this.expires = expires;
    }

}