package com.v1.ChildrenCare.DTOs;

import com.v1.ChildrenCare.entity.User;

import java.time.LocalDate;

public class ReservationDto {
    public class ReservationSearch{
        Double   totalPrice;
        String    notes;
        LocalDate  CreatedDate ;
        User createdBy;
        User ModifiedBy;
        LocalDate LastModifiedDate;
    }
}
