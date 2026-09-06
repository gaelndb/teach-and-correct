package com.teachandcorrect.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.teachandcorrect.backend.dto.student.StudentRequest;
import com.teachandcorrect.backend.dto.student.StudentResponse;
import com.teachandcorrect.backend.entity.Student;
import com.teachandcorrect.backend.entity.StudentUser;
import com.teachandcorrect.backend.entity.User;
import com.teachandcorrect.backend.repository.StudentRepository;
import com.teachandcorrect.backend.repository.StudentUserRepository;
import com.teachandcorrect.backend.repository.UserRepository;

@Service
public class StudentService {

    private static final String STUDENT_REMOVAL_NOT_FOUND_MESSAGE = "Student not found. Removal unsuccessful.";

    private final StudentRepository studentRepository;
    private final StudentUserRepository studentUserRepository;
    private final UserRepository userRepository;

    public StudentService(
            StudentRepository studentRepository,
            StudentUserRepository studentUserRepository,
            UserRepository userRepository
    ) {
        this.studentRepository = studentRepository;
        this.studentUserRepository = studentUserRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<StudentResponse> getStudentsByUser(Long userId) {
        ensureUserExists(userId);

        return studentUserRepository.findByUserIdAndActiveTrueOrderByStudentLastNameAscStudentFirstNameAsc(userId)
                .stream()
                .map(StudentUser::getStudent)
                .map(this::toStudentResponse)
                .toList();
    }

    @Transactional
    public StudentResponse addStudentToUser(Long userId, StudentRequest request) {
        User user = findUserOrThrow(userId);
        Student student = new Student(
                request.firstName().trim(),
                request.lastName().trim(),
                request.className().trim()
        );

        Student savedStudent = studentRepository.save(student);
        StudentUser studentUser = new StudentUser(user, savedStudent);
        studentUserRepository.save(studentUser);

        return toStudentResponse(savedStudent);
    }

    @Transactional
    public void removeStudentFromUser(Long userId, Long studentId) {
        StudentUser studentUser = studentUserRepository.findByUserIdAndStudentIdAndActiveTrue(userId, studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_REMOVAL_NOT_FOUND_MESSAGE));

        studentUser.setActive(false);
        studentUserRepository.save(studentUser);
    }

    private void ensureUserExists(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }

    private StudentResponse toStudentResponse(Student student) {
        return new StudentResponse(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getClassName()
        );
    }
}
