package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}