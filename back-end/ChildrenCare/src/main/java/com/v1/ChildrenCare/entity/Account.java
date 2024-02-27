package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "email", nullable = false, length = 50)
    private String email;
    private String password;
    private String accessToken;
    private Boolean isAccessTokenActive;
    private String resetPasswordToken;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "email"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> role;
    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDate CreatedDate;

    @ManyToOne
    @JoinColumn(name = "created_by", updatable = false)
    private User createdBy;

    private Long ModifiedBy_UserId ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDate LastModifiedDate;
    //-------------------
    public Account() {
    }

    public Account(Long id, String email, String password, String accessToken, Boolean isAccessTokenActive, String resetPasswordToken, List<Role> role, enumActive isActive, LocalDate createdDate, User createdBy, Long modifiedBy_UserId, LocalDate lastModifiedDate) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
        this.isAccessTokenActive = isAccessTokenActive;
        this.resetPasswordToken = resetPasswordToken;
        this.role = role;
        this.isActive = isActive;
        CreatedDate = createdDate;
        this.createdBy = createdBy;
        ModifiedBy_UserId = modifiedBy_UserId;
        LastModifiedDate = lastModifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Boolean getAccessTokenActive() {
        return isAccessTokenActive;
    }

    public void setAccessTokenActive(Boolean accessTokenActive) {
        isAccessTokenActive = accessTokenActive;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public List<Role> getRole() {
        return role;
    }

    public void setRole(List<Role> role) {
        this.role = role;
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

    public Long getModifiedBy_UserId() {
        return ModifiedBy_UserId;
    }

    public void setModifiedBy_UserId(Long modifiedBy_UserId) {
        ModifiedBy_UserId = modifiedBy_UserId;
    }

    public LocalDate getLastModifiedDate() {
        return LastModifiedDate;
    }

    public void setLastModifiedDate(LocalDate lastModifiedDate) {
        LastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", isAccessTokenActive=" + isAccessTokenActive +
                ", resetPasswordToken='" + resetPasswordToken + '\'' +
                ", role=" + role +
                ", isActive=" + isActive +
                ", CreatedDate=" + CreatedDate +
                ", createdBy=" + createdBy +
                ", ModifiedBy_UserId=" + ModifiedBy_UserId +
                ", LastModifiedDate=" + LastModifiedDate +
                '}';
    }
}
//@OneToMany
//    private List<User> ModifiedBy ;