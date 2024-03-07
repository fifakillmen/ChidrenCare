package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String phone;
    private String address;
    private String avartaLink;
    private String avatarFileName;
    @Enumerated(EnumType.STRING)
    private enumGender gender;


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

    public User(Long id, String firstName, String lastName, LocalDate dob, String phone, String address, String avartaLink, String avatarFileName, enumGender gender, enumActive isActive, LocalDate createdDate, User createdBy, Long modifiedBy_UserId, LocalDate lastModifiedDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.phone = phone;
        this.address = address;
        this.avartaLink = avartaLink;
        this.avatarFileName = avatarFileName;
        this.gender = gender;
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
        final StringBuffer sb = new StringBuffer("User{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", dob=").append(dob);
        sb.append(", phone='").append(phone).append('\'');
        sb.append(", address='").append(address).append('\'');
        sb.append(", avartaLink='").append(avartaLink).append('\'');
        sb.append(", avatarFileName='").append(avatarFileName).append('\'');
        sb.append(", gender=").append(gender);
        sb.append(", isActive=").append(isActive);
        sb.append(", CreatedDate=").append(CreatedDate);
        sb.append(", createdBy=").append(createdBy);
        sb.append(", ModifiedBy_UserId=").append(ModifiedBy_UserId);
        sb.append(", LastModifiedDate=").append(LastModifiedDate);
        sb.append('}');
        return sb.toString();
    }
}
