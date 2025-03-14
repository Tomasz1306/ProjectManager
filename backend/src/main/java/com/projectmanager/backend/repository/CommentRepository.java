package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
    
}
