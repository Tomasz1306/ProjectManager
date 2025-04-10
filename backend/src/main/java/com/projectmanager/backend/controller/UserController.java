package com.projectmanager.backend.controller;


import com.projectmanager.backend.dto.request.UserFindByEmailKeyRequestDTO;
import com.projectmanager.backend.dto.response.UserFindByEmailKeyResponseDTO;
import com.projectmanager.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<UserFindByEmailKeyResponseDTO> findUsersByEmailKey(@RequestBody UserFindByEmailKeyRequestDTO request) {
        UserFindByEmailKeyResponseDTO response = userService.findUsersByEmailKey(request);
        System.out.println(response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
