package com.v1.ChildrenCare.request;

import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumActive;

import java.time.LocalDate;
import java.util.List;

public class LoginRespone {
    private Long UserId;
    private String email;
    private List<Role> roles;
    private String fname;
    private String lname;
    private String avatar;
    private String accessToken;
    private LocalDate created_date;
    private boolean is_access_token_active;
    private Long createdBy_UserId;
    private enumActive is_account_active;
    private Long modifiedBy_UserId;

    public LoginRespone() {
    }

    public LoginRespone(Long userId, String email, List<Role> roles, String fname, String lname, String avatar, String accessToken, LocalDate created_date, boolean is_access_token_active, Long createdBy_UserId, enumActive is_account_active, Long modifiedBy_UserId) {
        UserId = userId;
        this.email = email;
        this.roles = roles;
        this.fname = fname;
        this.lname = lname;
        this.avatar = avatar;
        this.accessToken = accessToken;
        this.created_date = created_date;
        this.is_access_token_active = is_access_token_active;
        this.createdBy_UserId = createdBy_UserId;
        this.is_account_active = is_account_active;
        this.modifiedBy_UserId = modifiedBy_UserId;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public LocalDate getCreated_date() {
        return created_date;
    }

    public void setCreated_date(LocalDate created_date) {
        this.created_date = created_date;
    }

    public boolean isIs_access_token_active() {
        return is_access_token_active;
    }

    public void setIs_access_token_active(boolean is_access_token_active) {
        this.is_access_token_active = is_access_token_active;
    }

    public Long getCreatedBy_UserId() {
        return createdBy_UserId;
    }

    public void setCreatedBy_UserId(Long createdBy_UserId) {
        this.createdBy_UserId = createdBy_UserId;
    }

    public enumActive getIs_account_active() {
        return is_account_active;
    }

    public void setIs_account_active(enumActive is_account_active) {
        this.is_account_active = is_account_active;
    }

    public Long getModifiedBy_UserId() {
        return modifiedBy_UserId;
    }

    public void setModifiedBy_UserId(Long modifiedBy_UserId) {
        this.modifiedBy_UserId = modifiedBy_UserId;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("LoginRespone{");
        sb.append("UserId=").append(UserId);
        sb.append(", email='").append(email).append('\'');
        sb.append(", roles=").append(roles);
        sb.append(", fname='").append(fname).append('\'');
        sb.append(", lname='").append(lname).append('\'');
        sb.append(", avatar='").append(avatar).append('\'');
        sb.append(", accessToken='").append(accessToken).append('\'');
        sb.append(", created_date=").append(created_date);
        sb.append(", is_access_token_active=").append(is_access_token_active);
        sb.append(", createdBy_UserId=").append(createdBy_UserId);
        sb.append(", is_account_active=").append(is_account_active);
        sb.append(", modifiedBy_UserId=").append(modifiedBy_UserId);
        sb.append('}');
        return sb.toString();
    }
}
