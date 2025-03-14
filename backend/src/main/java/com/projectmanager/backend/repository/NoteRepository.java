package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    
}
