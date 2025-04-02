package com.projectmanager.backend.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok annotations//
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
// **************** //

@Entity
@Table(name = "project_user")
public class ProjectUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_USER_SEQUENCE")
    @SequenceGenerator(name = "PROJECT_USER_SEQUENCE", sequenceName = "project_user_sequence")
    @Column(name = "id", nullable = false, unique = true)
    private long id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "isOwner")
    private Boolean isOwner;

    @OneToMany(mappedBy = "projectUser", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<ProjectUserIssue> projectUserIssues = new ArrayList<>();
}
