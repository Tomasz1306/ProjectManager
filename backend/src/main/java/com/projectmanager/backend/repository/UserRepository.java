package com.projectmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectmanager.backend.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
