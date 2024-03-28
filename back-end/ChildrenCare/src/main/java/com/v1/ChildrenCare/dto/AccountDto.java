package com.v1.ChildrenCare.dto;

import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumActive;

import java.time.LocalDate;
import java.util.List;

public class AccountDto {
    private Long id;
    private String email;
    private String password;
    private String accessToken;
    private Boolean isAccessTokenActive;
    private List<String> role;
    private enumActive isActive;
    private LocalDate CreatedDate;
    private Long ModifiedBy_UserId ;
    private LocalDate LastModifiedDate;

    public AccountDto() {
    }

    public AccountDto(Long id, String email, String password, String accessToken, Boolean isAccessTokenActive, List<String> role, enumActive isActive, LocalDate createdDate, Long modifiedBy_UserId, LocalDate lastModifiedDate) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
        this.isAccessTokenActive = isAccessTokenActive;
        this.role = role;
        this.isActive = isActive;
        CreatedDate = createdDate;
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

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
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
        final StringBuffer sb = new StringBuffer("AccountDto{");
        sb.append("id=").append(id);
        sb.append(", email='").append(email).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", accessToken='").append(accessToken).append('\'');
        sb.append(", isAccessTokenActive=").append(isAccessTokenActive);
        sb.append(", role=").append(role);
        sb.append(", isActive=").append(isActive);
        sb.append(", CreatedDate=").append(CreatedDate);
        sb.append(", ModifiedBy_UserId=").append(ModifiedBy_UserId);
        sb.append(", LastModifiedDate=").append(LastModifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
