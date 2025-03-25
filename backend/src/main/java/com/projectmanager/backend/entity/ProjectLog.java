package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "projectlog")
public class ProjectLog {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "projectlogdate", nullable = false)
    private Instant projectlogdate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "projectid", nullable = false)
    private Project projectid;

}