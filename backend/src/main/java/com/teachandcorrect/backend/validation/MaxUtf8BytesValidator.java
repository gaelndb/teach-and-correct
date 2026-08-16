package com.teachandcorrect.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.nio.charset.StandardCharsets;

/**
 * Counts the UTF-8 bytes of a string instead of Java characters.
 * Multi-byte characters such as accents or emojis can exceed byte-based limits faster.
 */
public class MaxUtf8BytesValidator implements ConstraintValidator<MaxUtf8Bytes, String> {

    private int maxBytes;

    @Override
    public void initialize(MaxUtf8Bytes constraintAnnotation) {
        this.maxBytes = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        return value.getBytes(StandardCharsets.UTF_8).length <= maxBytes;
    }
}
