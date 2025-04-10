package com.projectmanager.backend.domain;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Collate;

//Lombok annotations//
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//******************//

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROJECT_SEQUENCE")
    @SequenceGenerator(name = "PROJECT_SEQUENCE", sequenceName = "project_sequence")
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "dueDate")
    private Date dueDate;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @ToString.Exclude
    @JsonIgnore
    private List<ProjectUser> projectUsers = new ArrayList<>();
}
