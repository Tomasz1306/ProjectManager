package com.projectmanager.backend.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projectmanager.backend.config.JwtService;
import com.projectmanager.backend.domain.User;
import com.projectmanager.backend.domain.User.Role;
import com.projectmanager.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // private final AuthenticationController authenticationController;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var person = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .websiteRole(Role.USER)
                .build();

        repository.save(person);
        var jwtToken = jwtService.generateToken(person);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var person = repository.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(person);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public LogoutResponse logout(LogoutRequest request) {
        var person = repository.findByEmail(request.getEmail());
        jwtService.addTokenToBlackList(request.getToken(), person);
        return LogoutResponse.builder()
                        .email(request.getEmail())
                        .build();
    }

    public CheckTokenResponse checkToken(CheckTokenRequest request) {
        var person = repository.findByEmail(request.getEmail());
        if (jwtService.isTokenValid(request.getToken(), person)) {
            return CheckTokenResponse.builder()
                            .isValid(true)
                            .build();
        } else {
            return CheckTokenResponse.builder()
                            .isValid(false)
                            .build();
        }
    }
}
