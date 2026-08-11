package com.teachandcorrect.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Le prénom est obligatoire.")
        String firstName,

        @NotBlank(message = "Le nom est obligatoire.")
        String lastName,

        @NotBlank(message = "L'adresse email est obligatoire.")
        @Email(message = "L'adresse email doit avoir un format valide.")
        String email,

        @NotBlank(message = "Le mot de passe est obligatoire.")
        @Size(min = 8, message = "Le mot de passe ne respecte pas le format attendu.")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$",
                message = "Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
        )
        String password
) {
}
