package com.teachandcorrect.backend.dto.copy;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.teachandcorrect.backend.entity.enums.CopyStatus;

public record CopyResponse(
    Long id,
    String fileName,
    String subject,
    BigDecimal grade,
    String filePath,
    CopyStatus status,
    String comment,
    LocalDateTime importedAt,
    LocalDateTime updatedAt,
    Long userId,
    Long studentId
) {
}
