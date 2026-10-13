package com.portfolio.backend.service;

import com.portfolio.backend.dto.ProjectResponse;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByStartDateAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    private ProjectResponse toResponse(Project project) {
        List<String> technologies = Arrays.stream(project.getTechnologies().split(","))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                technologies,
                project.getRepositoryUrl(),
                project.getImageUrl(),
                project.getStartDate()
        );
    }
}
