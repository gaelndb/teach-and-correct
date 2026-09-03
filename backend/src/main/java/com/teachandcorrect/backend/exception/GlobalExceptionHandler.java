package com.teachandcorrect.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import com.teachandcorrect.backend.dto.message.MessageResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String POSTGRES_UNIQUE_VIOLATION_SQL_STATE = "23505";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageResponse> handleValidationException(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .orElse("Le formulaire contient des erreurs.");

        return ResponseEntity
                .badRequest()
                .body(new MessageResponse(message));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<MessageResponse> handleResponseStatusException(ResponseStatusException exception) {
        String message = exception.getReason() != null
                ? exception.getReason()
                : "Une erreur est survenue.";

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(new MessageResponse(message));
    }

    @ExceptionHandler(CannotGetJdbcConnectionException.class)
    public ResponseEntity<MessageResponse> handleCannotGetJdbcConnectionException(CannotGetJdbcConnectionException exception) {
        LOGGER.error("Database connection unavailable", exception);

        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new MessageResponse("La base de données est inaccessible."));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<MessageResponse> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        LOGGER.warn("Database integrity violation", exception);

        if (isUniqueConstraintViolation(exception)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Cette adresse email est déjà utilisée."));
        }

        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Les données envoyées ne respectent pas les contraintes attendues."));
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<MessageResponse> handleDataAccessException(DataAccessException exception) {
        LOGGER.error("Unexpected database error", exception);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Une erreur est survenue lors de l'accès aux données."));
    }

    private boolean isUniqueConstraintViolation(Throwable exception) {
        Throwable currentException = exception;

        while (currentException != null) {
            if (POSTGRES_UNIQUE_VIOLATION_SQL_STATE.equals(getSqlState(currentException))) {
                return true;
            }

            currentException = currentException.getCause();
        }

        return false;
    }

    private String getSqlState(Throwable exception) {
        if (exception instanceof java.sql.SQLException sqlException) {
            return sqlException.getSQLState();
        }

        return null;
    }
}
