package com.teachandcorrect.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import com.teachandcorrect.backend.dto.auth.AuthResponse;
import com.teachandcorrect.backend.dto.auth.LoginRequest;
import com.teachandcorrect.backend.dto.auth.RefreshTokenRequest;
import com.teachandcorrect.backend.dto.auth.RefreshTokenResponse;
import com.teachandcorrect.backend.dto.auth.RegisterRequest;
import com.teachandcorrect.backend.entity.User;
import com.teachandcorrect.backend.repository.UserRepository;
import com.teachandcorrect.backend.security.JwtProvider;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    private static final String EMAIL = "gaelle@example.com";
    private static final String PASSWORD = "password";
    private static final String PASSWORD_HASH = "hashed-password";
    private static final String ACCESS_TOKEN = "access-token";
    private static final String REFRESH_TOKEN = "refresh-token";
    private static final long ACCESS_TOKEN_EXPIRATION_MS = 123_456L;
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 987_654L;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    private AuthService authService;
    private User user;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, passwordEncoder, jwtProvider);

        user = new User(
                "Gaelle",
                "lefils",
                EMAIL,
                PASSWORD_HASH
        );
        ReflectionTestUtils.setField(user, "id", 1L);
    }

    @Test
    void loginWorkflowWithJwtTest() {
        LoginRequest request = new LoginRequest(EMAIL, PASSWORD);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(PASSWORD, PASSWORD_HASH)).thenReturn(true);
        
        when(jwtProvider.generateAccessToken(user)).thenReturn(ACCESS_TOKEN);
        when(jwtProvider.getAccessTokenExpirationMs()).thenReturn(ACCESS_TOKEN_EXPIRATION_MS);
        when(jwtProvider.generateRefreshToken(user)).thenReturn(REFRESH_TOKEN);
        when(jwtProvider.getRefreshTokenExpirationMs()).thenReturn(REFRESH_TOKEN_EXPIRATION_MS);

        AuthResponse response = authService.login(request);

        assertThat(response.id()).isEqualTo(user.getId());
        assertThat(response.firstName()).isEqualTo(user.getFirstName());
        assertThat(response.lastName()).isEqualTo(user.getLastName());
        assertThat(response.email()).isEqualTo(user.getEmail());
        assertThat(response.role()).isEqualTo(user.getRole().name());
        assertThat(response.accessToken()).isEqualTo(ACCESS_TOKEN);
        assertThat(response.accessTokenExpiresInMs()).isEqualTo(ACCESS_TOKEN_EXPIRATION_MS);
        assertThat(response.refreshToken()).isEqualTo(REFRESH_TOKEN);
        assertThat(response.refreshTokenExpiresInMs()).isEqualTo(REFRESH_TOKEN_EXPIRATION_MS);

        verify(userRepository).findByEmail(EMAIL);
        verify(passwordEncoder).matches(PASSWORD, PASSWORD_HASH);
        verify(jwtProvider).generateAccessToken(user);
        verify(jwtProvider).getAccessTokenExpirationMs();
        verify(jwtProvider).generateRefreshToken(user);
        verify(jwtProvider).getRefreshTokenExpirationMs();
    }

    @Test
    void registerWorkflowWithJwtTest() {
        RegisterRequest request = new RegisterRequest(
                user.getFirstName(),
                user.getLastName(),
                EMAIL,
                PASSWORD
        );
        when(userRepository.existsByEmail(EMAIL)).thenReturn(false);
        when(passwordEncoder.encode(PASSWORD)).thenReturn(PASSWORD_HASH);
        when(userRepository.save(any(User.class))).thenReturn(user);

        when(jwtProvider.generateAccessToken(user)).thenReturn(ACCESS_TOKEN);
        when(jwtProvider.getAccessTokenExpirationMs()).thenReturn(ACCESS_TOKEN_EXPIRATION_MS);
        when(jwtProvider.generateRefreshToken(user)).thenReturn(REFRESH_TOKEN);
        when(jwtProvider.getRefreshTokenExpirationMs()).thenReturn(REFRESH_TOKEN_EXPIRATION_MS);

        AuthResponse response = authService.register(request);

        assertThat(response.id()).isEqualTo(user.getId());
        assertThat(response.firstName()).isEqualTo(user.getFirstName());
        assertThat(response.lastName()).isEqualTo(user.getLastName());
        assertThat(response.email()).isEqualTo(user.getEmail());
        assertThat(response.role()).isEqualTo(user.getRole().name());
        assertThat(response.accessToken()).isEqualTo(ACCESS_TOKEN);
        assertThat(response.accessTokenExpiresInMs()).isEqualTo(ACCESS_TOKEN_EXPIRATION_MS);
        assertThat(response.refreshToken()).isEqualTo(REFRESH_TOKEN);
        assertThat(response.refreshTokenExpiresInMs()).isEqualTo(REFRESH_TOKEN_EXPIRATION_MS);

        verify(userRepository).existsByEmail(EMAIL);
        verify(passwordEncoder).encode(PASSWORD);
        verify(userRepository).save(any(User.class));
        verify(jwtProvider).generateAccessToken(user);
        verify(jwtProvider).getAccessTokenExpirationMs();
        verify(jwtProvider).generateRefreshToken(user);
        verify(jwtProvider).getRefreshTokenExpirationMs();
    }

    @Test
    void refreshTokenWorkflowTest() {
        RefreshTokenRequest request = new RefreshTokenRequest(REFRESH_TOKEN);
        when(jwtProvider.isRefreshTokenValid(REFRESH_TOKEN)).thenReturn(true);
        when(jwtProvider.getEmailFromToken(REFRESH_TOKEN)).thenReturn(EMAIL);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(jwtProvider.generateAccessToken(user)).thenReturn(ACCESS_TOKEN);
        when(jwtProvider.getAccessTokenExpirationMs()).thenReturn(ACCESS_TOKEN_EXPIRATION_MS);

        RefreshTokenResponse response = authService.refresh(request);

        assertThat(response.accessToken()).isEqualTo(ACCESS_TOKEN);
        assertThat(response.accessTokenExpiresInMs()).isEqualTo(ACCESS_TOKEN_EXPIRATION_MS);

        verify(jwtProvider).isRefreshTokenValid(REFRESH_TOKEN);
        verify(jwtProvider).getEmailFromToken(REFRESH_TOKEN);
        verify(userRepository).findByEmail(EMAIL);
        verify(jwtProvider).generateAccessToken(user);
        verify(jwtProvider).getAccessTokenExpirationMs();
    }

    @Test
    void invalidRefreshTokenWorkflowShouldReturnUnauthorizedTest() {
        RefreshTokenRequest request = new RefreshTokenRequest(REFRESH_TOKEN);
        when(jwtProvider.isRefreshTokenValid(REFRESH_TOKEN)).thenReturn(false);

        assertThatThrownBy(() -> authService.refresh(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(exception -> assertThat(((ResponseStatusException) exception).getStatusCode())
                        .isEqualTo(HttpStatus.UNAUTHORIZED));

        verify(jwtProvider).isRefreshTokenValid(REFRESH_TOKEN);
    }

    @Test
    void validRefreshTokenWithUnknownUserWorkflowShouldReturnUnauthorizedTest() {
        RefreshTokenRequest request = new RefreshTokenRequest(REFRESH_TOKEN);
        when(jwtProvider.isRefreshTokenValid(REFRESH_TOKEN)).thenReturn(true);
        when(jwtProvider.getEmailFromToken(REFRESH_TOKEN)).thenReturn(EMAIL);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.refresh(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(exception -> assertThat(((ResponseStatusException) exception).getStatusCode())
                        .isEqualTo(HttpStatus.UNAUTHORIZED));

        verify(jwtProvider).isRefreshTokenValid(REFRESH_TOKEN);
        verify(jwtProvider).getEmailFromToken(REFRESH_TOKEN);
        verify(userRepository).findByEmail(EMAIL);
    }
}
