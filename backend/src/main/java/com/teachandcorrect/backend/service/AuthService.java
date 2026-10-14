package com.teachandcorrect.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.teachandcorrect.backend.dto.auth.AuthResponse;
import com.teachandcorrect.backend.dto.auth.LoginRequest;
import com.teachandcorrect.backend.dto.auth.RefreshTokenRequest;
import com.teachandcorrect.backend.dto.auth.RefreshTokenResponse;
import com.teachandcorrect.backend.dto.auth.RegisterRequest;
import com.teachandcorrect.backend.entity.User;
import com.teachandcorrect.backend.repository.UserRepository;
import com.teachandcorrect.backend.security.JwtProvider;

import io.jsonwebtoken.JwtException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(request.email());

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cette adresse email est déjà utilisée.");
        }

        User user = new User(
                request.firstName().trim(),
                request.lastName().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.password())
        );

        User savedUser = userRepository.save(user);

        return toAuthResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = normalizeEmail(request.email());

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Les identifiants sont invalides."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Les identifiants sont invalides.");
        }

        return toAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public RefreshTokenResponse refresh(RefreshTokenRequest request) {
        try {
            String refreshToken = request.refreshToken();

            if (!jwtProvider.isRefreshTokenValid(refreshToken)) {
                throw invalidRefreshTokenException();
            }

            String email = jwtProvider.getEmailFromToken(refreshToken);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(this::invalidRefreshTokenException);

            return new RefreshTokenResponse(jwtProvider.generateAccessToken(user));
        } catch (JwtException | IllegalArgumentException exception) {
            throw invalidRefreshTokenException();
        }
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private ResponseStatusException invalidRefreshTokenException() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Le refresh token est invalide.");
    }

    private AuthResponse toAuthResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name(),
                jwtProvider.generateAccessToken(user),
                jwtProvider.generateRefreshToken(user)
        );
    }
}
