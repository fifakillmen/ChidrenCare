package com.v1.ChildrenCare.request;

import lombok.Data;
import org.springframework.data.domain.Pageable;

@Data
public class SearchChildrenRequest {
    private String name;
    private String isActive;
    private String ageMin;
    private String ageMax;
    private int pageNumber;
}
