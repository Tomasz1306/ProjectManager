package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Integer>{
    
}
