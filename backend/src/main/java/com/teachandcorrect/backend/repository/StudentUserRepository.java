package com.teachandcorrect.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachandcorrect.backend.entity.StudentUser;

public interface StudentUserRepository extends JpaRepository<StudentUser, Long> {

    List<StudentUser> findByUserIdAndActiveTrueOrderByStudentLastNameAscStudentFirstNameAsc(Long userId);

    Optional<StudentUser> findByUserIdAndStudentIdAndActiveTrue(Long userId, Long studentId);

    boolean existsByUserIdAndStudentIdAndActiveTrue(Long userId, Long studentId);
}
