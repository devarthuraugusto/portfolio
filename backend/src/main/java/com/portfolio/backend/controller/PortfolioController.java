package com.portfolio.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ExperienceRepository;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final ObjectMapper objectMapper;

    public PortfolioController(ProjectRepository projectRepository, ExperienceRepository experienceRepository,
                               ObjectMapper objectMapper) {
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/perfil")
    public JsonNode profile() throws IOException {
        return objectMapper.readTree(new ClassPathResource("dados/perfil.json").getInputStream());
    }

    @GetMapping("/projetos")
    public List<Map<String, Object>> projects() {
        return projectRepository.findAllByOrderByStartDateAsc().stream().map(this::project).toList();
    }

    @GetMapping("/experiencias")
    public List<Map<String, Object>> experiences() {
        return experienceRepository.findAllByOrderByStartDateAsc().stream().map(this::experience).toList();
    }

    private Map<String, Object> project(Project project) {
        return Map.of(
                "id", project.getId(),
                "nome", Map.of("pt", project.getName(), "en", project.getNameEn()),
                "descricao", Map.of("pt", project.getDescription(), "en", project.getDescriptionEn()),
                "tecnologias", List.of(project.getTechnologies().split(",")),
                "urlRepositorio", project.getRepositoryUrl(),
                "urlImagem", project.getImageUrl(),
                "dataInicio", project.getStartDate());
    }

    private Map<String, Object> experience(Experience experience) {
        String category = categoriaDaExperiencia(experience);
        return Map.of(
                "id", experience.getId(),
                "categoria", category,
                "instituicao", experience.getOrganization(),
                "cargo", Map.of("pt", experience.getRole(), "en", experience.getRoleEn()),
                "urlLogo", logoDaExperiencia(experience),
                "dataInicio", experience.getStartDate(),
                "dataFim", experience.getEndDate() == null ? "" : experience.getEndDate(),
                "descricao", Map.of("pt", experience.getDescription(), "en", experience.getDescriptionEn()));
    }

    private String categoriaDaExperiencia(Experience experience) {
    return switch (experience.getId().intValue()) {
        case 1 -> "ESTAGIO";
        case 2 -> "PROFISSIONAL";
        case 3 -> "PROFISSIONAL";
        default -> "PROFISSIONAL";
    };
    }

    private String logoDaExperiencia(Experience experience) {
    return switch (experience.getLogoIndex()) {
        case 1 -> "/logos/logoAssprom.jpg";
        case 2 -> "/logos/logoFit.jpg";
        case 3 -> "/logos/logoPuc.jpg";
        default -> "/logos/logoAssprom.jpg";
    };
    }
}
