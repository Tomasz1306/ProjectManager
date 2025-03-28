package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "person")
public class Person implements UserDetails{
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

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

    // @ColumnDefault("now()")
    // @Column(name = "createdat", nullable = false)
    // private Instant createdat;

    // @ColumnDefault("now()")
    // @Column(name = "updatedat", nullable = false)
    // private Instant updatedat;


    // @OneToMany(mappedBy = "personid",  fetch = FetchType.EAGER)
    // List<ProjectPerson> projectPersons;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getUsername() {
        return email; //THERE IS EMAIL BECOUSE OF USERDETAILS (FROM SPRING SECURITY) STRUCTURE NEEDED TO MAKE A JWT
                      //DO NOT CHANGE THAT 
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
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

    // public Instant getCreatedat() {
    //     return createdat;
    // }

    // public void setCreatedat(Instant createdat) {
    //     this.createdat = createdat;
    // }

    // public Instant getUpdatedat() {
    //     return updatedat;
    // }

    // public void setUpdatedat(Instant updatedat) {
    //     this.updatedat = updatedat;
    // }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}