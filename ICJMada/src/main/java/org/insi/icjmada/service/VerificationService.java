package org.insi.icjmada.service;

import lombok.RequiredArgsConstructor;
import org.insi.icjmada.entity.VerificationEntity;
import org.insi.icjmada.model.VerificationResult;
import org.insi.icjmada.repository.VerificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VerificationService {

    private final VerificationRepository repository;
    private final GeminiService geminiService;

    public VerificationResult verifier(String texte) {

        String analyseIA = geminiService.analyze(texte);

        // ✅ Utilisation correcte du parseur JSON + fallback regex
        boolean estVrai = geminiService.isTrue(analyseIA);

        VerificationEntity entity = new VerificationEntity();
        entity.setTexte(texte);
        entity.setVrai(estVrai);
        entity.setSource("Gemini IA");
        entity.setCreatedAt(LocalDateTime.now());
        repository.save(entity);

        return new VerificationResult(
                estVrai,
                analyseIA,
                "Gemini IA",
                LocalDateTime.now().toString()
        );
    }
}
