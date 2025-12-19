package org.insi.icjmada.controller;

import lombok.RequiredArgsConstructor;
import org.insi.icjmada.model.VerificationResult;
import org.insi.icjmada.service.VerificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class VerificationApiController {

    private final VerificationService verificationService;

    @PostMapping("/verify")
    public VerificationResult verify(@RequestBody org.insi.icjmada.model.VerificationRequestBody body) {
        return verificationService.verifier(body.getText());
    }
}

