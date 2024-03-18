package com.v1.ChildrenCare.request;

import lombok.Data;

@Data
public class CreateFeedbackRequest {
    private Long id;
    private String emails;
    private String fullname;
    private String mobile;
    private String gender;
    private String isActive;
    private Integer rating;
    private String reviewText;
}
