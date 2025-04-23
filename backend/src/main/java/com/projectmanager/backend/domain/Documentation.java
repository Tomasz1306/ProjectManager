package com.projectmanager.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

//Lombok annotations//
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//*****************//
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
@Table(name = "documentation")
public class Documentation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DOCUMENTATION_SEQUENCE")
    @SequenceGenerator(name = "DOCUMENTATION_SEQUENCE", sequenceName = "documentation_sequence", allocationSize = 1, initialValue = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "language")
    private String language;

    @Column(name = "createDate")
    private Date createDate;

    @Column(name = "description")
    private String description;

    @Column(name = "link")
    private String link;

    @Lob
    @Column(name = "file")
    private byte[] file;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
}
