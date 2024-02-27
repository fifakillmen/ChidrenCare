package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    String name;

    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;

    private LocalDate CreatedDate;
    private LocalDate UpdatedDate;
    //-------------------

    public Category() {
    }

    public Category(Long id, String name, enumActive isActive, LocalDate createdDate, LocalDate updatedDate) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        CreatedDate = createdDate;
        UpdatedDate = updatedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public enumActive getIsActive() {
        return isActive;
    }

    public void setIsActive(enumActive isActive) {
        this.isActive = isActive;
    }

    public LocalDate getCreatedDate() {
        return CreatedDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        CreatedDate = createdDate;
    }

    public LocalDate getUpdatedDate() {
        return UpdatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        UpdatedDate = updatedDate;
    }
}
