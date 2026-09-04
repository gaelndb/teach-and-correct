package com.teachandcorrect.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachandcorrect.backend.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByTeachersIdOrderByLastNameAscFirstNameAsc(Long teacherId);

    boolean existsByIdAndTeachersId(Long id, Long teacherId);
}
