package com.teachandcorrect.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "L'adresse email est obligatoire.")
        @Email(message = "L'adresse email doit avoir un format valide.")
        String email,

        @NotBlank(message = "Le mot de passe est obligatoire.")
        String password
) {
}
