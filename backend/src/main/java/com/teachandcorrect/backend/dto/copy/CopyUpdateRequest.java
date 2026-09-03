package com.teachandcorrect.backend.dto.copy;

import java.math.BigDecimal;

import com.teachandcorrect.backend.entity.enums.CopyStatus;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

public record CopyUpdateRequest(
    @DecimalMin(value = "0.0", message = "The grade cannot be less than 0.")
    @DecimalMax(value = "20.0", message = "The grade cannot be greater than 20.")
    BigDecimal grade,

    @Size(max = 5000, message = "The comment cannot exceed 5000 characters.")
    String comment,

    CopyStatus status
) {
}
