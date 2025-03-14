package com.projectmanager.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "person")
public class Person {
    @Id
    @Column(name = "id", nullable = false, length = Integer.MAX_VALUE)
    private String id;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "username", length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "password", length = Integer.MAX_VALUE)
    private String password;

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "emailverified")
    private Instant emailverified;

    @Column(name = "image", length = Integer.MAX_VALUE)
    private String image;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getEmailverified() {
        return emailverified;
    }

    public void setEmailverified(Instant emailverified) {
        this.emailverified = emailverified;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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