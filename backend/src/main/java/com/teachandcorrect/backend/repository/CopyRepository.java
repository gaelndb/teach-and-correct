package com.teachandcorrect.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachandcorrect.backend.entity.Copy;

public interface CopyRepository extends JpaRepository<Copy, Long> {

    List<Copy> findByUserIdAndActiveTrueOrderByImportedAtDesc(Long userId);

    Optional<Copy> findByIdAndUserIdAndActiveTrue(Long id, Long userId);
}
