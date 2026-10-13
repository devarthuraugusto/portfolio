package com.portfolio.backend.service;

import com.portfolio.backend.dto.ExperienceResponse;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceResponse> findAll() {
        return experienceRepository.findAllByOrderByStartDateAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    private ExperienceResponse toResponse(Experience experience) {
        return new ExperienceResponse(
                experience.getId(),
                experience.getOrganization(),
                experience.getRole(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.getDescription()
        );
    }
}
