package com.teachandcorrect.backend.dto.auth;

public record AuthResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String role
) {
}
