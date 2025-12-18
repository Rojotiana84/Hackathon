package org.insi.icjmada.service;

import lombok.RequiredArgsConstructor;
import org.insi.icjmada.entity.VerificationEntity;
import org.insi.icjmada.model.VerificationResult;
import org.insi.icjmada.repository.VerificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VerificationService {

    private final git VerificationRepository repository;

    private static final List<String> MOTS_SUSPECTS =
            List.of("gratuit", "argent", "urgent", "cliquez", "free", "win", "bola");

    public VerificationResult verifier(String texte) {

        boolean estVrai = MOTS_SUSPECTS.stream()
                .noneMatch(texte.toLowerCase()::contains);

        VerificationEntity entity = new VerificationEntity();
        entity.setTexte(texte);
        entity.setVrai(estVrai);
        entity.setSource("InfoCheck IA");
        entity.setCreatedAt(LocalDateTime.now());

        repository.save(entity);

        return new VerificationResult(
                estVrai,
                estVrai ? "Information fiable" : "Information suspecte",
                "InfoCheck IA",
                LocalDateTime.now().toString()
        );
    }
}
