package com.v1.ChildrenCare.entity;


import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(length = 2000)
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;
    private LocalDate createdDate;
    private LocalDate updatedDate;
    private String imageLink;
    private String avatarFileName;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @Enumerated(EnumType.STRING)
    private enumActive ACTIVE;

    public Post() {
    }

    public Post(Long id, String title, String author, String content, Category category, LocalDate createdDate, LocalDate updatedDate, String imageLink, String avatarFileName, List<Comment> comments, User user, enumActive ACTIVE) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.category = category;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.imageLink = imageLink;
        this.avatarFileName = avatarFileName;
        this.comments = comments;
        this.user = user;
        this.ACTIVE = ACTIVE;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public String getAvatarFileName() {
        return avatarFileName;
    }

    public void setAvatarFileName(String avatarFileName) {
        this.avatarFileName = avatarFileName;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public enumActive getACTIVE() {
        return ACTIVE;
    }

    public void setACTIVE(enumActive ACTIVE) {
        this.ACTIVE = ACTIVE;
    }
}
