package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "note")
public class Note {
    @Id
    @ColumnDefault("nextval('note_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "note", nullable = false, length = Integer.MAX_VALUE)
    private String note;

    @Column(name = "notedate", nullable = false)
    private Instant notedate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "taskid", nullable = false)
    private Issue taskid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Instant getNotedate() {
        return notedate;
    }

    public void setNotedate(Instant notedate) {
        this.notedate = notedate;
    }

    public Issue getTaskid() {
        return taskid;
    }

    public void setTaskid(Issue taskid) {
        this.taskid = taskid;
    }

}