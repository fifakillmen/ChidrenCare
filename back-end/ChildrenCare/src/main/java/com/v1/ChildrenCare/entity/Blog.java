package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    String title;
    @Column(nullable = false)
    String briefContent;

    private LocalDate createdDate;
    private LocalDate updatedDate;
    private String imageLink;

    @OneToOne
    @JoinColumn(name = "id")
    private Post post;
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    // ------------------


    public Blog() {
    }

    public Blog(Long id, String title, String briefContent, LocalDate createdDate, LocalDate updatedDate, String imageLink, Post post, enumActive isActive) {
        this.id = id;
        this.title = title;
        this.briefContent = briefContent;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.imageLink = imageLink;
        this.post = post;
        this.isActive = isActive;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBriefContent() {
        return briefContent;
    }

    public void setBriefContent(String briefContent) {
        this.briefContent = briefContent;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public enumActive getIsActive() {
        return isActive;
    }

    public void setIsActive(enumActive isActive) {
        this.isActive = isActive;
    }
}
