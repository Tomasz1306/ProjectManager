package com.projectmanager.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

//Lombok annotations//
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
// **************** //
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "project_user_issue")
public class ProjectUserIssue {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_USER_ISSUE_SEQUENCE")
    @SequenceGenerator(name = "PROJECT_USER_ISSUE_SEQUENCE", sequenceName = "project_user_issue_sequence", allocationSize = 1, initialValue = 1)
    private Long id;
    
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "project_user_id")
    @ToString.Exclude
    private ProjectUser projectUser;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "issue_id")
    @JsonBackReference
    private Issue issue;
}
