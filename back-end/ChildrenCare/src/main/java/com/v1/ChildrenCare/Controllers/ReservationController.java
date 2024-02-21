package com.v1.ChildrenCare.Controllers;


import com.v1.ChildrenCare.DTOs.ReservationDto;
import com.v1.ChildrenCare.entity.Reservation;
import org.springframework.ui.Model;
import com.v1.ChildrenCare.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController //@RequestMapping("/Reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @RequestMapping("/contact")
    public String toContact() {
        return "This is ContactPage";
    }

    @RequestMapping(value = "/GetReservation",method = POST)
    public String toContact(@ModelAttribute Reservation reservation, Model model) {
        return reservation.toString();
    }

    @RequestMapping("/MyReservation/{id}")
    public String myReservation(@PathVariable("id") int id) {
        return reservationService.getReservationsByUserId(id).toString();
    }

//    @RequestMapping(value="/MyReservation/Search",method = POST)
//    public String myReservationSearch(@ModelAttribute ReservationDto.ReservationSearch ReservationSearch, Model model) {
//        return
//    }
}