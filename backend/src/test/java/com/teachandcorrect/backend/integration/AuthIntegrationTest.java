package com.teachandcorrect.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.teachandcorrect.backend.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AuthIntegrationTest {

    private static final long ACCESS_TOKEN_EXPIRATION_MS = 123_456L;
    private static final long REFRESH_TOKEN_EXPIRATION_MS = 987_654L;

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("teachandcorrect_auth_test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("app.jwt.secret", () -> "this-is-a-very-long-secret-key-for-auth-integration-tests-123456789");
        registry.add("app.jwt.access-token-expiration-ms", () -> String.valueOf(ACCESS_TOKEN_EXPIRATION_MS));
        registry.add("app.jwt.refresh-token-expiration-ms", () -> String.valueOf(REFRESH_TOKEN_EXPIRATION_MS));
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String userRegistration;
    private String userLogin;

    @BeforeEach
    void setUp() {
        firstName = "Gaelle";
        lastName = "Lefils";
        email = "gaelle.lefils@gmail.com";
        password = "Password1!";

        userRegistration = """
                {
                  "firstName": "%s",
                  "lastName": "%s",
                  "email": "%s",
                  "password": "%s"
                }
                """.formatted(firstName, lastName, email, password);

        userLogin = """
                {
                  "email": "%s",
                  "password": "%s"
                }
                """.formatted(email, password);
    }

    @AfterEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void registrationWorkflowTest() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRegistration))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.firstName").value(firstName))
                .andExpect(jsonPath("$.lastName").value(lastName))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("TEACHER"))
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.accessTokenExpiresInMs").value(ACCESS_TOKEN_EXPIRATION_MS))
                .andExpect(jsonPath("$.refreshToken").isNotEmpty())
                .andExpect(jsonPath("$.refreshTokenExpiresInMs").value(REFRESH_TOKEN_EXPIRATION_MS));

        assertThat(userRepository.existsByEmail(email)).isTrue();
    }

    @Test
    void loginWorkflowTest() throws Exception {
        registerUser();

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userLogin))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.firstName").value(firstName))
                .andExpect(jsonPath("$.lastName").value(lastName))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("TEACHER"))
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.accessTokenExpiresInMs").value(ACCESS_TOKEN_EXPIRATION_MS))
                .andExpect(jsonPath("$.refreshToken").isNotEmpty())
                .andExpect(jsonPath("$.refreshTokenExpiresInMs").value(REFRESH_TOKEN_EXPIRATION_MS));
    }

    @Test
    void loginWithInvalidCredentialsWorkflowTest() throws Exception {
        registerUser();

        String invalidLogin = """
                {
                  "email": "%s",
                  "password": "WrongPassword1!"
                }
                """.formatted(email);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidLogin))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Les identifiants sont invalides."));
    }

    @Test
    void protectedRouteWithoutTokenWorkflowTest() throws Exception {
        mockMvc.perform(get("/api/users/1/students"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Unauthorized"));
    }

    @Test
    void protectedRouteWithInvalidTokenWorkflowTest() throws Exception {
        mockMvc.perform(get("/api/users/1/students")
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Unauthorized"));
    }

    @Test
    void protectedRouteWithValidTokenWorkflowTest() throws Exception {
        MvcResult registrationResult = registerUser();
        JsonNode authResponse = objectMapper.readTree(registrationResult.getResponse().getContentAsString());
        Long userId = authResponse.get("id").asLong();
        String accessToken = authResponse.get("accessToken").asText();

        mockMvc.perform(get("/api/users/" + userId + "/students")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    private MvcResult registerUser() throws Exception {
        return mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRegistration))
                .andExpect(status().isCreated())
                .andReturn();
    }
}
