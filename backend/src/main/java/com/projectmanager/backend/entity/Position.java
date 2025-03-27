package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Position")
public class Position {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY ,optional = false)
    @JoinColumns({
        @JoinColumn(name = "projectid", referencedColumnName = "projectid"),
        @JoinColumn(name = "personid", referencedColumnName = "personid")
    })
    private ProjectPerson projectPersonid;
    
}
