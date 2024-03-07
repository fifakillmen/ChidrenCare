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
    @Column(length = 1000)
    private String accessToken;
    private Boolean isAccessTokenActive;
    private String resetPasswordToken;

    private String verifiEmailCode;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "account_role",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> role;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive;
    @org.springframework.data.annotation.CreatedDate
    @Column(updatable = false)
    private LocalDate CreatedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by", updatable = false)
    private Account createdBy;

    private Long ModifiedBy_UserId ;
    @org.springframework.data.annotation.LastModifiedDate
    private LocalDate LastModifiedDate;
    //-------------------
    public Account() {
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

    public String getVerifiEmailCode() {
        return verifiEmailCode;
    }

    public void setVerifiEmailCode(String verifiEmailCode) {
        this.verifiEmailCode = verifiEmailCode;
    }

    public List<Role> getRole() {
        return role;
    }

    public void setRole(List<Role> role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Account getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Account createdBy) {
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
        final StringBuffer sb = new StringBuffer("Account{");
        sb.append("id=").append(id);
        sb.append(", email='").append(email).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", accessToken='").append(accessToken).append('\'');
        sb.append(", isAccessTokenActive=").append(isAccessTokenActive);
        sb.append(", resetPasswordToken='").append(resetPasswordToken).append('\'');
        sb.append(", verifiEmailCode='").append(verifiEmailCode).append('\'');
        sb.append(", role=").append(role);
        sb.append(", user=").append(user);
        sb.append(", isActive=").append(isActive);
        sb.append(", CreatedDate=").append(CreatedDate);
        sb.append(", createdBy=").append(createdBy);
        sb.append(", ModifiedBy_UserId=").append(ModifiedBy_UserId);
        sb.append(", LastModifiedDate=").append(LastModifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
//@OneToMany
//    private List<User> ModifiedBy ;