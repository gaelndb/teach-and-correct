package com.teachandcorrect.backend.dto.student;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StudentRequest(
    @NotBlank(message = "Le prénom est obligatoire.")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères.")
    String firstName,

    @NotBlank(message = "Le nom est obligatoire.")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères.")
    String lastName,

    @NotBlank(message = "La classe est obligatoire.")
    @Size(max = 20, message = "La classe ne peut pas dépasser 20 caractères.")
    String className
) {
}
