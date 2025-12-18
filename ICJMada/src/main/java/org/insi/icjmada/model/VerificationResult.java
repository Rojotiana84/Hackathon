package org.insi.icjmada.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerificationResult {
    private boolean vrai;
    private String message;
    private String source;
    private String date;
}
