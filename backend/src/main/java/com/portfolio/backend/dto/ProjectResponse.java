package com.portfolio.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        List<String> technologies,
        String repositoryUrl,
        String imageUrl,
        LocalDate startDate
) {
}
