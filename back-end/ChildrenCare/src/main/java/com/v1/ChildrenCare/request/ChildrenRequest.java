package com.v1.ChildrenCare.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ChildrenRequest {
    private Long id;
    private String firstName;
    private String gender;
    private int age;
    private String lastName;
    private LocalDate dob;
    private String note;
    private String isActive;
}
