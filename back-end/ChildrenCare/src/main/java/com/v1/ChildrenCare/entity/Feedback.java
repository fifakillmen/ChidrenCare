package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "feedbacks")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String fullname;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String mobile;
    @Enumerated(EnumType.STRING)
    private enumGender gender;
    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private String reviewText;
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDateTime CreatedDate;

    @ManyToOne
    @JoinColumn(name = "created_by", updatable = false)
    private User createdBy;
    @Column(nullable = false)
    private String Service;
    @OneToMany
    private List<User> ModifiedBy ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDateTime LastModifiedDate;
    public Feedback() {
    }

    public Feedback(Long id, String fullname, String email, String mobile, enumGender gender, Integer rating, String reviewText, enumActive isActive, LocalDateTime createdDate, User createdBy, String service, List<User> modifiedBy, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.mobile = mobile;
        this.gender = gender;
        this.rating = rating;
        this.reviewText = reviewText;
        this.isActive = isActive;
        CreatedDate = createdDate;
        this.createdBy = createdBy;
        Service = service;
        ModifiedBy = modifiedBy;
        LastModifiedDate = lastModifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public enumGender getGender() {
        return gender;
    }

    public void setGender(enumGender gender) {
        this.gender = gender;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public enumActive getIsActive() {
        return isActive;
    }

    public void setIsActive(enumActive isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedDate() {
        return CreatedDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        CreatedDate = createdDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getService() {
        return Service;
    }

    public void setService(String service) {
        Service = service;
    }

    public List<User> getModifiedBy() {
        return ModifiedBy;
    }

    public void setModifiedBy(List<User> modifiedBy) {
        ModifiedBy = modifiedBy;
    }

    public LocalDateTime getLastModifiedDate() {
        return LastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        LastModifiedDate = lastModifiedDate;
    }
}
