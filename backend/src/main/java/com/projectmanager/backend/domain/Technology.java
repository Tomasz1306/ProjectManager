package com.projectmanager.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "technology")
public class Technology {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TECHNOLOGY_SEQUENCE")
    @SequenceGenerator(name = "TECHNOLOGY_SEQUENCE", sequenceName = "technology_sequence", allocationSize = 1, initialValue = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
}
