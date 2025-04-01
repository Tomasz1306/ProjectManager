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
//******************//

@Entity
@Table(name = "issue_priority")
public class IssuePriority {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ISSUE_PRIORITY_SEQUENCE")
    @SequenceGenerator(name = "ISSUE_PRIORITY_SEQUENCE",  sequenceName = "issue_priority_sequence")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "priority", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<Issue> issues = new ArrayList<>();
}
