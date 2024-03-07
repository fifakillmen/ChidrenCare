package com.v1.ChildrenCare.entity;


import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String serviceTitle;
    private String servicePrice;
    private String salePrice;

    private String thumbnail;

    @Column(length = 2000)
    private String serviceDetail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;

    private LocalDate CreatedDate;
    private LocalDate UpdatedDate;

    @ManyToOne
@JoinColumn(name = "created_by", updatable = false)
private User createdBy;


    //-------------------
    public Service() {
    }

    public Service(Long id, String serviceTitle, String servicePrice, String salePrice, String thumbnail, String serviceDetail, Category category, enumActive isActive, LocalDate createdDate, LocalDate updatedDate, User createdBy) {
        this.id = id;
        this.serviceTitle = serviceTitle;
        this.servicePrice = servicePrice;
        this.salePrice = salePrice;
        this.thumbnail = thumbnail;
        this.serviceDetail = serviceDetail;
        this.category = category;
        this.isActive = isActive;
        CreatedDate = createdDate;
        UpdatedDate = updatedDate;
        this.createdBy = createdBy;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceTitle() {
        return serviceTitle;
    }

    public void setServiceTitle(String serviceTitle) {
        this.serviceTitle = serviceTitle;
    }

    public String getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(String servicePrice) {
        this.servicePrice = servicePrice;
    }

    public String getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(String salePrice) {
        this.salePrice = salePrice;
    }

    public String getServiceDetail() {
        return serviceDetail;
    }

    public void setServiceDetail(String serviceDetail) {
        this.serviceDetail = serviceDetail;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
