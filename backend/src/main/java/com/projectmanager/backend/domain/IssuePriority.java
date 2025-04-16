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
//******************//
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "issue_priority")
public class IssuePriority {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ISSUE_PRIORITY_SEQUENCE")
    @SequenceGenerator(name = "ISSUE_PRIORITY_SEQUENCE",  sequenceName = "issue_priority_sequence", allocationSize = 1, initialValue = 1)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "priority", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @ToString.Exclude
    List<Issue> issues = new ArrayList<>();
}
