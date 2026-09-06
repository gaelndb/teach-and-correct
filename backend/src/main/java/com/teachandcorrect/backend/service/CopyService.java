package com.teachandcorrect.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.teachandcorrect.backend.dto.copy.CopyRequest;
import com.teachandcorrect.backend.dto.copy.CopyResponse;
import com.teachandcorrect.backend.dto.copy.CopyUpdateRequest;
import com.teachandcorrect.backend.entity.Copy;
import com.teachandcorrect.backend.entity.Student;
import com.teachandcorrect.backend.entity.User;
import com.teachandcorrect.backend.entity.enums.CopyStatus;
import com.teachandcorrect.backend.repository.CopyRepository;
import com.teachandcorrect.backend.repository.StudentRepository;
import com.teachandcorrect.backend.repository.StudentUserRepository;
import com.teachandcorrect.backend.repository.UserRepository;

@Service
public class CopyService {

    private static final String COPY_NOT_FOUND_MESSAGE = "Copy not found.";
    private static final String COPY_REMOVAL_NOT_FOUND_MESSAGE = "Copy not found. Removal unsuccessful.";
    private static final String STUDENT_NOT_FOUND_MESSAGE = "Student not found.";
    private static final String USER_NOT_FOUND_MESSAGE = "User not found.";

    private final CopyRepository copyRepository;
    private final StudentRepository studentRepository;
    private final StudentUserRepository studentUserRepository;
    private final UserRepository userRepository;

    public CopyService(
            CopyRepository copyRepository,
            StudentRepository studentRepository,
            StudentUserRepository studentUserRepository,
            UserRepository userRepository
    ) {
        this.copyRepository = copyRepository;
        this.studentRepository = studentRepository;
        this.studentUserRepository = studentUserRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CopyResponse> getCopiesByUser(Long userId) {
        ensureUserExists(userId);

        return copyRepository.findByUserIdAndActiveTrueOrderByImportedAtDesc(userId)
                .stream()
                .map(this::toCopyResponse)
                .toList();
    }

    @Transactional
    public CopyResponse addCopyToUser(Long userId, CopyRequest request) {
        User user = findUserOrThrow(userId);
        Student student = findUserStudentOrThrow(userId, request.studentId());
        Copy copy = new Copy(
                request.fileName().trim(),
                request.subject().trim(),
                request.filePath().trim(),
                user,
                student
        );

        copy.setGrade(request.grade());
        copy.setComment(request.comment());
        copy.setStatus(request.status() != null ? request.status() : CopyStatus.TO_CORRECT);

        return toCopyResponse(copyRepository.save(copy));
    }

    @Transactional
    public CopyResponse updateUserCopy(Long userId, Long copyId, CopyUpdateRequest request) {
        Copy copy = copyRepository.findByIdAndUserIdAndActiveTrue(copyId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COPY_NOT_FOUND_MESSAGE));

        if (request.grade() != null) {
            copy.setGrade(request.grade());
        }

        if (request.comment() != null) {
            copy.setComment(request.comment());
        }

        if (request.status() != null) {
            copy.setStatus(request.status());
        }

        return toCopyResponse(copyRepository.save(copy));
    }

    @Transactional
    public void removeUserCopy(Long userId, Long copyId) {
        Copy copy = copyRepository.findByIdAndUserIdAndActiveTrue(copyId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COPY_REMOVAL_NOT_FOUND_MESSAGE));

        copy.setActive(false);
        copyRepository.save(copy);
    }

    private void ensureUserExists(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, USER_NOT_FOUND_MESSAGE);
        }
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USER_NOT_FOUND_MESSAGE));
    }

    private Student findUserStudentOrThrow(Long userId, Long studentId) {
        if (!studentUserRepository.existsByUserIdAndStudentIdAndActiveTrue(userId, studentId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND_MESSAGE);
        }

        return studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND_MESSAGE));
    }

    private CopyResponse toCopyResponse(Copy copy) {
        return new CopyResponse(
                copy.getId(),
                copy.getFileName(),
                copy.getSubject(),
                copy.getGrade(),
                copy.getFilePath(),
                copy.getStatus(),
                copy.getComment(),
                copy.getImportedAt(),
                copy.getUpdatedAt(),
                copy.getUser().getId(),
                copy.getStudent().getId()
        );
    }
}
