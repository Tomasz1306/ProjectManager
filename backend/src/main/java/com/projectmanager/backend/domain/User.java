package com.projectmanager.backend.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//Lombok annotations//
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
// **************** //
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "user_")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQUENCE")
    @SequenceGenerator(name = "USER_SEQUENCE", sequenceName = "user_sequence")
    private Long id;
    
    @Column(name = "name")
    private String name;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "websiteRole")
    private Role websiteRole;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @ToString.Exclude
    private List<ProjectUser> projectUsers = new ArrayList<>();

    public enum Role {
        USER, ADMIN;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(websiteRole.name()));
    }
}

