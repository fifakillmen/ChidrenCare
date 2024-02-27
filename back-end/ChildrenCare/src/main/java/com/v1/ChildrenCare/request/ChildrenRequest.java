package com.v1.ChildrenCare.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ChildrenRequest {
    private Long id;
    private String firstName;
    private boolean gender;
    private String lastName;
    private LocalDate dob;
    private String interest;
    private String needs;
    private String note;
    private boolean isActive;
}
