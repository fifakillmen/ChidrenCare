package com.v1.ChildrenCare.request;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public class UserRequest {
  private String email;
    private  String username;
    private  String firstName;
    private String lastName;
    private String dobString;
    private String phone;
    private String address;
    private String gender;
    private MultipartFile avatarFile;

    public UserRequest() {
    }

    public UserRequest(String email, String username, String firstName, String lastName, String dobString, String phone, String address, String gender, MultipartFile avatarFile) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dobString = dobString;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.avatarFile = avatarFile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getDobString() {
        return dobString;
    }

    public void setDobString(String dobString) {
        this.dobString = dobString;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public MultipartFile getAvatarFile() {
        return avatarFile;
    }

    public void setAvatarFile(MultipartFile avatarFile) {
        this.avatarFile = avatarFile;
    }
}
