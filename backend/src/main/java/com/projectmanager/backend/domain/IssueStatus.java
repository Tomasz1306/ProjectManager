package com.projectmanager.backend.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
//*****************//
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "issue_status")
public class IssueStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ISSUE_STATUS_SEQUENCE")
    @SequenceGenerator(name = "ISSUE_STATUS_SEQUENCE", sequenceName = "issue_status_sequence", allocationSize = 1, initialValue = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "status", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<Issue> issues = new ArrayList<>();
}
