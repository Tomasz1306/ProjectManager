package com.projectmanager.backend.service;


import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.dto.request.UserFindByEmailKeyRequestDTO;
import com.projectmanager.backend.dto.request.UserResponseDTO;
import com.projectmanager.backend.dto.response.UserFindByEmailKeyResponseDTO;
import com.projectmanager.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserFindByEmailKeyResponseDTO findUsersByEmailKey(UserFindByEmailKeyRequestDTO request) {
        List<User> findedUsers = userRepository.findByEmailContaining(request.getKey());
        List<UserResponseDTO> findedUsersDTO = new ArrayList<>();
        for (User user : findedUsers) {
            findedUsersDTO.add(UserResponseDTO
                    .builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .username(user.getUsername())
                    .name(user.getName())
                    .build());
        }
        System.out.println(findedUsersDTO);
        return UserFindByEmailKeyResponseDTO
                .builder()
                .users(findedUsersDTO)
                .build();
    }
}
