package com.v1.ChildrenCare.entity;

import jakarta.persistence.*;

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
    @Column(nullable = false)
    private boolean isAccessTokenActive;
    private String ressetPasswordToken;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "email"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> role;

    public Account() {
    }

    public Account(Long id, String email, String password, String accessToken, boolean isAccessTokenActive, String ressetPasswordToken, List<Role> role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
        this.isAccessTokenActive = isAccessTokenActive;
        this.ressetPasswordToken = ressetPasswordToken;
        this.role = role;
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

    public boolean isAccessTokenActive() {
        return isAccessTokenActive;
    }

    public void setAccessTokenActive(boolean accessTokenActive) {
        isAccessTokenActive = accessTokenActive;
    }

    public String getRessetPasswordToken() {
        return ressetPasswordToken;
    }

    public void setRessetPasswordToken(String ressetPasswordToken) {
        this.ressetPasswordToken = ressetPasswordToken;
    }

    public List<Role> getRole() {
        return role;
    }

    public void setRole(List<Role> role) {
        this.role = role;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Account{");
        sb.append("id=").append(id);
        sb.append(", email='").append(email).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", accessToken='").append(accessToken).append('\'');
        sb.append(", isAccessTokenActive=").append(isAccessTokenActive);
        sb.append(", ressetPasswordToken='").append(ressetPasswordToken).append('\'');
        sb.append(", role=").append(role);
        sb.append('}');
        return sb.toString();
    }
}
