package com.v1.ChildrenCare.request;


import lombok.Data;

@Data
public class CreatePostRequest {

        private Long id;
        private String title;
        private String content;
        private String imageLink;
    }

