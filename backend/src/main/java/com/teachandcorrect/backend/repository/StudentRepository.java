package com.teachandcorrect.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachandcorrect.backend.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
