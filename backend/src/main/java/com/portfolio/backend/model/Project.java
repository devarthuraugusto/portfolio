package com.portfolio.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "description_en", nullable = false, length = 2000)
    private String descriptionEn;

    @Column(nullable = false)
    private String technologies;

    @Column(nullable = false)
    private String repositoryUrl;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDate startDate;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getNameEn() {
        return nameEn;
    }

    public String getDescription() {
        return description;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public String getTechnologies() {
        return technologies;
    }

    public String getRepositoryUrl() {
        return repositoryUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public LocalDate getStartDate() {
        return startDate;
    }
}
