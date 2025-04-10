package com.projectmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectmanager.backend.domain.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByEmailContaining(String email);
}
