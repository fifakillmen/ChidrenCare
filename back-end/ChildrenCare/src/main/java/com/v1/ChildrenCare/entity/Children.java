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
    String createdBy;

    @Enumerated(EnumType.STRING)
    private enumActive isActive = enumActive.ACTIVE;
    private LocalDate CreatedDate;
    private LocalDate UpdatedDate;

    //-------------------
    public Children() {
    }

    public Children(Long id, String firstName, String lastName, LocalDate dob, int age, String gender, String note, String createdBy, enumActive isActive, LocalDate createdDate, LocalDate updatedDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.note = note;
        this.createdBy = createdBy;
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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}