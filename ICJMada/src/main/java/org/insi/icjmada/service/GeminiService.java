package org.insi.icjmada.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyze(String text) {
        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.5-pro",
                "gemini-flash-latest",
                "gemini-pro-latest"
        };

        for (String model : models) {
            try {
                return tryModel(model, text);
            } catch (Exception e) {
                System.out.println("❌ Échec modèle : " + model + " -> " + e.getMessage());
            }
        }

        return getFallbackAnalysis(text);
    }

    private String tryModel(String model, String text) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + model + ":generateContent?key=" + apiKey;

        Map<String, Object> request = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text",
                                        "Analyse le texte suivant et réponds UNIQUEMENT au format JSON:\n" +
                                                "{ \"verdict\": \"VRAI|FAUX|PARTIELLEMENT VRAI\", \"reason\": \"<explication courte>\" }\n" +
                                                "Texte: " + text)
                        ))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map<String, Object>> response =
                restTemplate.exchange(url, HttpMethod.POST, entity, new ParameterizedTypeReference<>() {});

        Map<String, Object> body = response.getBody();
        if (body == null) return "Analyse impossible.";

        List<?> candidates = (List<?>) body.get("candidates");
        if (candidates == null || candidates.isEmpty()) return "Aucune réponse IA.";

        Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
        Map<?, ?> content = (Map<?, ?>) candidate.get("content");
        List<?> parts = (List<?>) content.get("parts");

        if (parts == null || parts.isEmpty()) return "Réponse vide.";

        Map<?, ?> part = (Map<?, ?>) parts.get(0);
        return part.get("text").toString();
    }

    private String getFallbackAnalysis(String text) {
        String lower = text.toLowerCase();

        if (lower.contains("terre plate")) {
            return "{ \"verdict\": \"FAUX\", \"reason\": \"La Terre est sphérique. Preuves scientifiques établies.\" }";
        }
        if (lower.contains("5g") && lower.contains("covid")) {
            return "{ \"verdict\": \"FAUX\", \"reason\": \"Aucun lien scientifique entre la 5G et le COVID.\" }";
        }
        if (lower.contains("madagascar")) {
            return "{ \"verdict\": \"VRAI\", \"reason\": \"Madagascar est un pays souverain reconnu internationalement.\" }";
        }

        return "{ \"verdict\": \"INCONNU\", \"reason\": \"À vérifier manuellement : consulte des sources fiables.\" }";
    }

    /** Parse le verdict depuis la réponse JSON ou texte brut */
    public boolean isTrue(String analyseIA) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(analyseIA);
            String verdict = root.path("verdict").asText("").toUpperCase();
            return "VRAI".equals(verdict);
        } catch (Exception e) {
            // Fallback regex si pas JSON
            String s = analyseIA == null ? "" : analyseIA.trim().toUpperCase();
            Pattern p = Pattern.compile("\\b(VRAI|FAUX|PARTIELLEMENT VRAI)\\b");
            Matcher m = p.matcher(s);
            if (m.find()) {
                return "VRAI".equals(m.group(1));
            }
            return false;
        }
    }
}
