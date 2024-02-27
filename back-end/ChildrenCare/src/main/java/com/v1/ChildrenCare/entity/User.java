package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String phone;
    private String address;
    private String avartaLink;
    private String avatarFileName;
    @Enumerated(EnumType.STRING)
    private enumGender gender;
    @OneToOne
    @JoinColumn(name = "email")
    private Account account;

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
    public User() {
    }

    public User(Long id, String username, String firstName, String lastName, LocalDate dob, String phone, String address, String avartaLink, String avatarFileName, enumGender gender, Account account, enumActive isActive, LocalDate createdDate, User createdBy, Long modifiedBy_UserId, LocalDate lastModifiedDate) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.phone = phone;
        this.address = address;
        this.avartaLink = avartaLink;
        this.avatarFileName = avatarFileName;
        this.gender = gender;
        this.account = account;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvartaLink() {
        return avartaLink;
    }

    public void setAvartaLink(String avartaLink) {
        this.avartaLink = avartaLink;
    }

    public String getAvatarFileName() {
        return avatarFileName;
    }

    public void setAvatarFileName(String avatarFileName) {
        this.avatarFileName = avatarFileName;
    }

    public enumGender getGender() {
        return gender;
    }

    public void setGender(enumGender gender) {
        this.gender = gender;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dob=" + dob +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", avartaLink='" + avartaLink + '\'' +
                ", avatarFileName='" + avatarFileName + '\'' +
                ", gender=" + gender +
                ", account=" + account +
                ", isActive=" + isActive +
                ", CreatedDate=" + CreatedDate +
                ", createdBy=" + createdBy +
                ", ModifiedBy_UserId=" + ModifiedBy_UserId +
                ", LastModifiedDate=" + LastModifiedDate +
                '}';
    }
}
