package com.v1.ChildrenCare.dto;

import com.v1.ChildrenCare.entity.Comment;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumActive;

import java.time.LocalDateTime;
import java.util.List;

public class PostDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String imageLink;
    private enumActive isActive;
    private List<Comment> comments;

    private User user;

    public PostDto() {
    }

    public PostDto(Long id, String title, String content, LocalDateTime createdDate, LocalDateTime updatedDate, String imageLink, enumActive isActive, List<Comment> comments, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.imageLink = imageLink;
        this.isActive = isActive;
        this.comments = comments;
        this.user = user;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public enumActive getIsActive() {
        return isActive;
    }

    public void setIsActive(enumActive isActive) {
        this.isActive = isActive;
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

    @Override
    public String toString() {
        return "PostDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createdDate=" + createdDate +
                ", updatedDate=" + updatedDate +
                ", imageLink='" + imageLink + '\'' +
                ", isActive=" + isActive +
                ", comments=" + comments +
                ", user=" + user +
                '}';
    }
}
