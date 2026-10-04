package com.teachandcorrect.backend.dto.auth;

public record RefreshTokenResponse(
        String accessToken,
        long accessTokenExpiresInMs
) {
}
