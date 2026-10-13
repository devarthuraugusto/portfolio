package com.portfolio.backend.dto;

import java.time.LocalDate;

public record ExperienceResponse(
        Long id,
        String organization,
        String role,
        LocalDate startDate,
        LocalDate endDate,
        String description
) {
}
