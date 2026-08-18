package com.teachandcorrect.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.nio.charset.StandardCharsets;

public class BCryptCompatiblePasswordValidator
        implements ConstraintValidator<BCryptCompatiblePassword, String> {

    private static final int BCRYPT_PASSWORD_BYTE_LIMIT = 72;

    @Override
    public boolean isValid(
            String password,
            ConstraintValidatorContext validationContext
    ) {
        return password == null || isWithinBcryptPasswordByteLimit(password);
    }

    private boolean isWithinBcryptPasswordByteLimit(String password) {
        int passwordLengthInBytes =
                password.getBytes(StandardCharsets.UTF_8).length;

        return passwordLengthInBytes <= BCRYPT_PASSWORD_BYTE_LIMIT;
    }
}