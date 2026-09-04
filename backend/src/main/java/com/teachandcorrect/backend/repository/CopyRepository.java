package com.teachandcorrect.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachandcorrect.backend.entity.Copy;

public interface CopyRepository extends JpaRepository<Copy, Long> {

    List<Copy> findByUserIdOrderByImportedAtDesc(Long userId);

    Optional<Copy> findByIdAndUserId(Long id, Long userId);
}
