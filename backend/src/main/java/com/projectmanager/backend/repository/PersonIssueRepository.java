package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.PersonIssue;
import com.projectmanager.backend.entity.PersonIssueId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PersonIssueRepository extends JpaRepository<PersonIssue, PersonIssueId>{
    List<PersonIssue> findById_Personid(String personid);

    List<PersonIssue> findById_Issueid(Integer issueid);

    @Query("select pp from PersonIssue pp join fetch pp.personid join fetch pp.issueid where pp.id.personid = :personid")
    List<PersonIssue> findByPersonIdWithDetails(@Param("personid") Integer personid);
}
