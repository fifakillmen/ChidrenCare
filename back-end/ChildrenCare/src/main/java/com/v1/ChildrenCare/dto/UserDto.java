package com.v1.ChildrenCare.dto;

import com.v1.ChildrenCare.enumPack.enumGender;

import java.time.LocalDate;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String phone;
    private String address;
    private String avartaLink;
    private String avatarFileName;
    private enumGender gender;

    public UserDto() {
    }

    public UserDto(Long id,  String firstName, String lastName, LocalDate dob, String phone, String address, String avartaLink, String avatarFileName, enumGender gender) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.phone = phone;
        this.address = address;
        this.avartaLink = avartaLink;
        this.avatarFileName = avatarFileName;
        this.gender = gender;
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


    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("UserDto{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", dob=").append(dob);
        sb.append(", phone='").append(phone).append('\'');
        sb.append(", address='").append(address).append('\'');
        sb.append(", avartaLink='").append(avartaLink).append('\'');
        sb.append(", avatarFileName='").append(avatarFileName).append('\'');
        sb.append(", gender=").append(gender);
        sb.append('}');
        return sb.toString();
    }
}
