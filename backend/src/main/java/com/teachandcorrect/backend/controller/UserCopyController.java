package com.teachandcorrect.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachandcorrect.backend.dto.copy.CopyRequest;
import com.teachandcorrect.backend.dto.copy.CopyResponse;
import com.teachandcorrect.backend.dto.copy.CopyUpdateRequest;
import com.teachandcorrect.backend.dto.message.MessageResponse;
import com.teachandcorrect.backend.service.CopyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users/{userId}/copies")
public class UserCopyController {

    private final CopyService copyService;

    public UserCopyController(CopyService copyService) {
        this.copyService = copyService;
    }

    @GetMapping
    public ResponseEntity<List<CopyResponse>> getCopies(@PathVariable Long userId) {
        return ResponseEntity.ok(copyService.getCopiesByUser(userId));
    }

    @PostMapping
    public ResponseEntity<CopyResponse> addCopy(
            @PathVariable Long userId,
            @Valid @RequestBody CopyRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(copyService.addCopyToUser(userId, request));
    }

    @PatchMapping("/{copyId}")
    public ResponseEntity<CopyResponse> updateCopy(
            @PathVariable Long userId,
            @PathVariable Long copyId,
            @Valid @RequestBody CopyUpdateRequest request
    ) {
        return ResponseEntity.ok(copyService.updateUserCopy(userId, copyId, request));
    }

    @DeleteMapping("/{copyId}")
    public ResponseEntity<MessageResponse> removeCopy(
            @PathVariable Long userId,
            @PathVariable Long copyId
    ) {
        copyService.removeUserCopy(userId, copyId);

        return ResponseEntity.ok(new MessageResponse("Copy has successfully been removed."));
    }
}
