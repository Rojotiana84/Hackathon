package org.insi.icjmada.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationRequest {

    private String link;

    @NotBlank
    private String text;
}
