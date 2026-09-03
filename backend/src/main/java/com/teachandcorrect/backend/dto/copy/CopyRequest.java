package com.teachandcorrect.backend.dto.copy;

import java.math.BigDecimal;

import com.teachandcorrect.backend.entity.enums.CopyStatus;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CopyRequest(
    @NotBlank(message = "The file name is required.")
    @Size(max = 100, message = "The file name cannot exceed 100 characters.")
    String fileName,

    @NotBlank(message = "The subject is required.")
    @Size(max = 100, message = "The subject cannot exceed 100 characters.")
    String subject,

    @NotBlank(message = "The file path is required.")
    @Size(max = 500, message = "The file path cannot exceed 500 characters.")
    String filePath,

    @NotNull(message = "The student id is required.")
    Long studentId,

    @DecimalMin(value = "0.0", message = "The grade cannot be less than 0.")
    @DecimalMax(value = "40.0", message = "The grade cannot be greater than 40.")
    BigDecimal grade,

    @Size(max = 5000, message = "The comment cannot exceed 5000 characters.")
    String comment,

    CopyStatus status
) {
}
