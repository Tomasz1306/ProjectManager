package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.ProjectPerson;
import com.projectmanager.backend.entity.ProjectPersonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectPersonRepository extends JpaRepository<ProjectPerson, ProjectPersonId> {

    List<ProjectPerson> findById_Projectid(Integer projectid);

    List<ProjectPerson> findById_Personid(String personid);

    @Query("select pp from ProjectPerson pp join fetch pp.personid join fetch pp.projectid where pp.id.projectid = :projectid")
    List<ProjectPerson> findByProjectIdWithDetails(@Param("projectid") Integer projectid);
}
