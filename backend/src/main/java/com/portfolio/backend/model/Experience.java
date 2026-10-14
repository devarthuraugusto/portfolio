package com.portfolio.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String organization;

    @Column(nullable = false)
    private String role;

    @Column(name = "role_en", nullable = false)
    private String roleEn;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(name = "logo_index", nullable = false)
    private Integer logoIndex;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "description_en", nullable = false, length = 2000)
    private String descriptionEn;

    public Long getId() {
        return id;
    }

    public String getOrganization() {
        return organization;
    }

    public String getRole() {
        return role;
    }

    public String getRoleEn() {
        return roleEn;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getLogoIndex() {
        return logoIndex;
    }

    public String getDescription() {
        return description;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }
}
