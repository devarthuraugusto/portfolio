package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ContactService {

    private final RestClient restClient;
    private final String resendApiKey;
    private final String toEmail;

    public ContactService(
            RestClient.Builder restClientBuilder,
            @Value("${resend.api-key:}") String resendApiKey,
            @Value("${contact.to-email}") String toEmail
    ) {
        this.restClient = restClientBuilder.baseUrl("https://api.resend.com").build();
        this.resendApiKey = resendApiKey;
        this.toEmail = toEmail;
    }

    public void send(ContactRequest request) {
        if (resendApiKey.isBlank()) {
            throw new IllegalStateException("RESEND_API_KEY is not configured");
        }

        ResendPayload payload = new ResendPayload(
                "Portfolio Contact <onboarding@resend.dev>",
                List.of(toEmail),
                "Contato do portfólio: " + request.name(),
                "Nome: " + request.name() + "\nEmail: " + request.email() + "\n\n" + request.message(),
                request.email()
        );

        restClient.post()
                .uri("/emails")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + resendApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .toBodilessEntity();
    }

    private record ResendPayload(
            String from,
            List<String> to,
            String subject,
            String text,
            String reply_to
    ) {
    }
}
