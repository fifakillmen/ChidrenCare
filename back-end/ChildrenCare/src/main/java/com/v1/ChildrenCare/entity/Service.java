package com.v1.ChildrenCare.entity;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String serviceTitle;
    private LocalDate createdDate;
    private LocalDate updatedDate;
    private String servicePrice;

    @Column(length = 2000)
    private String serviceDetail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    public Service() {
    }

    public Service(Long id, String serviceTitle, LocalDate createdDate, LocalDate updatedDate, String servicePrice, String serviceDetail, Category category) {
        this.id = id;
        this.serviceTitle = serviceTitle;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.servicePrice = servicePrice;
        this.serviceDetail = serviceDetail;
        this.category = category;
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

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(String servicePrice) {
        this.servicePrice = servicePrice;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Service{");
        sb.append("id=").append(id);
        sb.append(", serviceTitle='").append(serviceTitle).append('\'');
        sb.append(", createdDate=").append(createdDate);
        sb.append(", updatedDate=").append(updatedDate);
        sb.append(", servicePrice='").append(servicePrice).append('\'');
        sb.append(", serviceDetail='").append(serviceDetail).append('\'');
        sb.append(", category=").append(category);
        sb.append('}');
        return sb.toString();
    }
}
