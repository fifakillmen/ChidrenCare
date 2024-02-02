package com.v1.ChildrenCare.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private String reviewText;

    public Feedback() {
    }

    public Feedback(Long id, String customerName, LocalDateTime date, Integer rating, String reviewText) {
        this.id = id;
        this.customerName = customerName;
        this.date = date;
        this.rating = rating;
        this.reviewText = reviewText;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Feedback{");
        sb.append("id=").append(id);
        sb.append(", customerName='").append(customerName).append('\'');
        sb.append(", date=").append(date);
        sb.append(", rating=").append(rating);
        sb.append(", reviewText='").append(reviewText).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
