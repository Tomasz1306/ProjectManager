package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "change")
public class Change {
    @Id
    @ColumnDefault("nextval('change_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "changedate", nullable = false)
    private Instant changedate;

    @Column(name = "changeinfo", nullable = false, length = Integer.MAX_VALUE)
    private String changeinfo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "taskid", nullable = false)
    private Issue taskid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getChangedate() {
        return changedate;
    }

    public void setChangedate(Instant changedate) {
        this.changedate = changedate;
    }

    public String getChangeinfo() {
        return changeinfo;
    }

    public void setChangeinfo(String changeinfo) {
        this.changeinfo = changeinfo;
    }

    public Issue getTaskid() {
        return taskid;
    }

    public void setTaskid(Issue taskid) {
        this.taskid = taskid;
    }

}