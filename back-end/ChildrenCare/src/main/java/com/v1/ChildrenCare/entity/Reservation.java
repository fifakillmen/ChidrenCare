package com.v1.ChildrenCare.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    Double totalPrice;
    String notes;
    Date dateCreated;

    public Reservation() {
    }

    public Reservation(Long id, User user, Double totalPrice, String notes, Date dateCreated) {
        this.id = id;
        this.user = user;
        this.totalPrice = totalPrice;
        this.notes = notes;
        this.dateCreated = dateCreated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Reservation{");
        sb.append("id=").append(id);
        sb.append(", user=").append(user);
        sb.append(", totalPrice=").append(totalPrice);
        sb.append(", notes='").append(notes).append('\'');
        sb.append(", dateCreated=").append(dateCreated);
        sb.append('}');
        return sb.toString();
    }
}
