package com.v1.ChildrenCare.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "childinfo")
public class ChildInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    String firstName;
    String lastName;
    LocalDate dob;
    boolean gender;
    String interest;
    String needs;
    String note;
    @ManyToOne(fetch = FetchType.LAZY)
    User user;
    @Column(name = "child_information_id")
    private Long childInformationId;


    boolean status = false;

    public ChildInformation() {
    }

    public ChildInformation(Long id, String firstName, String lastName, LocalDate dob, boolean gender, String interest, String needs, String note, User user, Long childInformationId, boolean status) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.interest = interest;
        this.needs = needs;
        this.note = note;
        this.user = user;
        this.childInformationId = childInformationId;
        this.status = status;
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

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }

    public String getNeeds() {
        return needs;
    }

    public void setNeeds(String needs) {
        this.needs = needs;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("ChildInformation{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", dob=").append(dob);
        sb.append(", gender=").append(gender);
        sb.append(", interest='").append(interest).append('\'');
        sb.append(", needs='").append(needs).append('\'');
        sb.append(", note='").append(note).append('\'');
        sb.append(", user=").append(user);
        sb.append(", childInformationId=").append(childInformationId);
        sb.append(", status=").append(status);
        sb.append('}');
        return sb.toString();
    }
}
