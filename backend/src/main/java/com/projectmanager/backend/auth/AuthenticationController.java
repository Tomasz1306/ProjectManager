package com.projectmanager.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(
        @RequestBody LogoutRequest request
    ) {
        return ResponseEntity.ok(service.logout(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/checkToken")
    public ResponseEntity<CheckTokenResponse> checkToken(
        @RequestBody CheckTokenRequest request
    ) {
        return ResponseEntity.ok(service.checkToken(request));
    }
}
