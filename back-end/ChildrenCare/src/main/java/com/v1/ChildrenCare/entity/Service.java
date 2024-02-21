package com.v1.ChildrenCare.entity;


import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

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

    @Column(length = 2000)
    private String serviceDetail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDate CreatedDate;

    @ManyToOne
@JoinColumn(name = "created_by", updatable = false)
private User createdBy;

    @OneToMany
    private List<User> ModifiedBy ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDate LastModifiedDate;
    //-------------------
    public Service() {
    }

    public Service(Long id, String serviceTitle, String servicePrice, String serviceDetail, Category category, enumActive isActive, LocalDate createdDate, User createdBy, List<User> modifiedBy, LocalDate lastModifiedDate) {
        this.id = id;
        this.serviceTitle = serviceTitle;
        this.servicePrice = servicePrice;
        this.serviceDetail = serviceDetail;
        this.category = category;
        this.isActive = isActive;
        CreatedDate = createdDate;
        this.createdBy = createdBy;
        ModifiedBy = modifiedBy;
        LastModifiedDate = lastModifiedDate;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public List<User> getModifiedBy() {
        return ModifiedBy;
    }

    public void setModifiedBy(List<User> modifiedBy) {
        ModifiedBy = modifiedBy;
    }

    public LocalDate getLastModifiedDate() {
        return LastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        LastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Service{");
        sb.append("id=").append(id);
        sb.append(", serviceTitle='").append(serviceTitle).append('\'');
        sb.append(", servicePrice='").append(servicePrice).append('\'');
        sb.append(", serviceDetail='").append(serviceDetail).append('\'');
        sb.append(", category=").append(category);
        sb.append(", isActive=").append(isActive);
        sb.append(", CreatedDate=").append(CreatedDate);
        sb.append(", createdBy=").append(createdBy);
        sb.append(", ModifiedBy=").append(ModifiedBy);
        sb.append(", LastModifiedDate=").append(LastModifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
