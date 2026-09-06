package com.teachandcorrect.backend.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachandcorrect.backend.dto.message.MessageResponse;
import com.teachandcorrect.backend.dto.student.StudentRequest;
import com.teachandcorrect.backend.dto.student.StudentResponse;
import com.teachandcorrect.backend.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users/{userId}/students")
public class UserStudentController {

    private final StudentService studentService;

    public UserStudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getStudents(@PathVariable Long userId) {
        return ResponseEntity.ok(studentService.getStudentsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<StudentResponse> addStudent(
            @PathVariable Long userId,
            @Valid @RequestBody StudentRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentService.addStudentToUser(userId, request));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<MessageResponse> removeStudent(
            @PathVariable Long userId,
            @PathVariable Long studentId
    ) {
        studentService.removeStudentFromUser(userId, studentId);

        return ResponseEntity.ok(new MessageResponse("Student has successfully been removed."));
    }
}
