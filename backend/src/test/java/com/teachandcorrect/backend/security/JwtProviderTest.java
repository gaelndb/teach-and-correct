package com.teachandcorrect.backend.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import com.teachandcorrect.backend.entity.User;

import io.jsonwebtoken.JwtException;

class JwtProviderTest {

    private static final String JWT_SECRET = "this-is-a-very-long-secret-key-for-jwt-tests-123456789";
    private static final long ACCESS_TOKEN_EXPIRATION_MS = 123_456L;
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 987_654L;

    private final JwtProvider jwtProvider = new JwtProvider(
            JWT_SECRET,
            ACCESS_TOKEN_EXPIRATION_MS,
            REFRESH_TOKEN_EXPIRATION_MS
    );

    private User user;

    @BeforeEach
    void setUp() {
        user = new User(
                "Gaelle",
                "lefils",
                "gaelle@example.com",
                "hashed-password"
        );
        ReflectionTestUtils.setField(user, "id", 1L);
    }

    @Test
    void generateAccessTokenTest() {

        String token = jwtProvider.generateAccessToken(user);

        assertThat(token).isNotBlank();
        assertThat(token.split("\\.")).hasSize(3);
    }

    @Test
    void generateRefreshTokenTest() {

        String token = jwtProvider.generateRefreshToken(user);

        assertThat(token).isNotBlank();
        assertThat(token.split("\\.")).hasSize(3);
    }

    @Test
    void accessTokenShouldBeValidTest() {

        String token = jwtProvider.generateAccessToken(user);

        assertThat(jwtProvider.isAccessTokenValid(token)).isTrue();
        assertThat(jwtProvider.getEmailFromToken(token)).isEqualTo(user.getEmail());
    }

    @Test
    void refreshTokenShouldBeValidTest() {

        String token = jwtProvider.generateRefreshToken(user);

        assertThat(jwtProvider.isRefreshTokenValid(token)).isTrue();
        assertThat(jwtProvider.getEmailFromToken(token)).isEqualTo(user.getEmail());
    }

    @Test
    void expiredAccessTokenShouldBeInvalidTest() {
        JwtProvider expiredAccessTokenJwtProvider = new JwtProvider(
                JWT_SECRET,
                -1000L,
                REFRESH_TOKEN_EXPIRATION_MS
        );

        String token = expiredAccessTokenJwtProvider.generateAccessToken(user);

        assertThatThrownBy(() -> expiredAccessTokenJwtProvider.isAccessTokenValid(token))
                .isInstanceOf(JwtException.class);
    }

    @Test
    void expiredRefreshTokenShouldBeInvalidTest() {
        JwtProvider expiredRefreshTokenJwtProvider = new JwtProvider(
                JWT_SECRET,
                ACCESS_TOKEN_EXPIRATION_MS,
                -1000L
        );

        String token = expiredRefreshTokenJwtProvider.generateRefreshToken(user);

        assertThatThrownBy(() -> expiredRefreshTokenJwtProvider.isRefreshTokenValid(token))
                .isInstanceOf(JwtException.class);
    }

}
