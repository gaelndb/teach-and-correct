package com.teachandcorrect.backend.dto.student;

public record StudentResponse(
    Long id,
    String firstName,
    String lastName,
    String className
) {
}
