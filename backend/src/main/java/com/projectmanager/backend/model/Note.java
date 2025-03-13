package com.projectmanager.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Note")
public class Note {
    private String note;
    private Date noteDate;

    @ManyToOne
    @JoinColumn(name = "issueId")
    private Issue issue;
}
