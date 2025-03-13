package com.projectmanager.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "Attachament")
public class Attachment extends BaseEntity {
    private String attachment;
}