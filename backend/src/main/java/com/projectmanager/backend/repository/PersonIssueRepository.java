package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.PersonIssue;
import com.projectmanager.backend.entity.PersonIssueId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonIssueRepository extends JpaRepository<PersonIssue, PersonIssueId>{
    List<PersonIssue> findById_Personid(Integer personid);
}
