package com.teachandcorrect.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.teachandcorrect.backend.validation.MaxUtf8Bytes;

public record RegisterRequest(
        @NotBlank(message = "Le prénom est obligatoire.")
        @Size(max = 100, message = "Le prénom est trop long.")
        String firstName,

        @NotBlank(message = "Le nom est obligatoire.")
        @Size(max = 100, message = "Le nom est trop long.")
        String lastName,

        @NotBlank(message = "L'adresse email est obligatoire.")
        @Email(message = "L'adresse email doit avoir un format valide.")
        @Size(max = 253, message = "L'adresse email est trop longue.")
        String email,

        @NotBlank(message = "Le mot de passe est obligatoire.")
        @Size(min = 8, message = "Le mot de passe ne respecte pas le format attendu.")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$",
                message = "Le mot de passe doit contenir 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
        )
        @MaxUtf8Bytes(value = 72, message = "Le mot de passe est trop long.")
        String password
) {
}
