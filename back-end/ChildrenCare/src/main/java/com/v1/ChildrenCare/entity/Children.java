package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumActive;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "children")
public class Children {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    String firstName;
    String lastName;
    LocalDate dob;
    int age;
    String gender;

    String note;
    @ManyToOne(fetch = FetchType.LAZY)
    User user;
    @Column(name = "child_information_id")
    private Long childInformationId;

    // ------------------
    @Enumerated(EnumType.STRING)
    private enumActive isActive = enumActive.ACTIVE;
    private LocalDate CreatedDate;
    private LocalDate UpdatedDate;

    //-------------------
    public Children() {
    }

    public Children(Long id, String firstName, String lastName, LocalDate dob, int age, String gender, String note, User user, Long childInformationId, enumActive isActive, LocalDate createdDate, LocalDate updatedDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.note = note;
        this.user = user;
        this.childInformationId = childInformationId;
        this.isActive = isActive;
        CreatedDate = createdDate;
        UpdatedDate = updatedDate;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getChildInformationId() {
        return childInformationId;
    }

    public void setChildInformationId(Long childInformationId) {
        this.childInformationId = childInformationId;
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

    public LocalDate getUpdatedDate() {
        return UpdatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        UpdatedDate = updatedDate;
    }
}