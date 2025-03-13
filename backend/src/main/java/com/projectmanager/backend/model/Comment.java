package com.projectmanager.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "Comment")
public class Comment {
    private String comment;
    private Date commentDate;
}
