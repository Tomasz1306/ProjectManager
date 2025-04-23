package com.projectmanager.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
// **************** //

@Entity
@Table(name = "milestone")
public class MileStone {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MILESTONE_SEQUENCE")
    @SequenceGenerator(name = "MILESTONE_SEQUENCE", sequenceName = "milestone_sequence",  allocationSize = 1, initialValue = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "finished")
    private String finished;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
}
