package com.projectmanager.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @ColumnDefault("nextval('tag_id_seq')")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "tag", nullable = false, length = Integer.MAX_VALUE)
    private String tag;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "taskid", nullable = false)
    private Issue taskid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Issue getTaskid() {
        return taskid;
    }

    public void setTaskid(Issue taskid) {
        this.taskid = taskid;
    }

}