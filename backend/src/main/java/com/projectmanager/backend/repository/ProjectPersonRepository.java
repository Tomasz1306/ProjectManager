package com.projectmanager.backend.repository;

import com.projectmanager.backend.entity.ProjectPerson;
import com.projectmanager.backend.entity.ProjectPersonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProjectPersonRepository extends JpaRepository<ProjectPerson, ProjectPersonId> {

    List<ProjectPerson> findById_Projectid(Integer projectid);

    List<ProjectPerson> findById_Personid(Integer personid);

    Optional<ProjectPerson> findById_ProjectidAndId_Personid(Integer projectid, Integer personid);

    @Transactional
    void deleteById_ProjectidAndId_Personid(Integer projectid, Integer personid);
}
