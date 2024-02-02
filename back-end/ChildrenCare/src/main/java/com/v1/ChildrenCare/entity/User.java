package com.v1.ChildrenCare.entity;

import com.v1.ChildrenCare.enumPack.enumGender;
import jakarta.persistence.*;

import java.time.LocalDate;

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
    public User() {
    }

    public User(Long id, String username, String firstName, String lastName, LocalDate dob, String phone, String address, String avartaLink, String avatarFileName, Account account) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.phone = phone;
        this.address = address;
        this.avartaLink = avartaLink;
        this.avatarFileName = avatarFileName;
        this.account = account;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("User{");
        sb.append("id=").append(id);
        sb.append(", username='").append(username).append('\'');
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", dob=").append(dob);
        sb.append(", phone='").append(phone).append('\'');
        sb.append(", address='").append(address).append('\'');
        sb.append(", avartaLink='").append(avartaLink).append('\'');
        sb.append(", avatarFileName='").append(avatarFileName).append('\'');
        sb.append(", account=").append(account);
        sb.append('}');
        return sb.toString();
    }
}
