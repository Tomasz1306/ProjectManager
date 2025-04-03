package com.projectmanager.backend.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "isOwner")
    private Boolean isOwner;

    @OneToMany(mappedBy = "projectUser")
    private List<ProjectUserIssue> projectUserIssues = new ArrayList<>();
}
