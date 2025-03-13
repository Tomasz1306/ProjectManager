package com.projectmanager.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "Change")
public class Change extends BaseEntity {
    private Date changeDate;
    private String changeInfo;
}
