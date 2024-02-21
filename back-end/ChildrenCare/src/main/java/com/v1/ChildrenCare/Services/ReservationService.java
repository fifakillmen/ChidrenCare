package com.v1.ChildrenCare.Services;

import com.v1.ChildrenCare.Repository.ReservationRepository;
import com.v1.ChildrenCare.entity.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.v1.ChildrenCare.DTOs.ReservationDto;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }


    public List<Reservation> getReservationsByUserId(int id) {
        return reservationRepository.findByUser_Id(id);
    }
//    public List<Reservation> getReservationsSearchOption(ReservationSearch reservationSearch) {
//
//    }
    public List<Reservation> findByTotalPrice(Double totalPrice) {
        return reservationRepository.findByTotalPrice(totalPrice);
    }

    public List<Reservation> findByNotes(String notes) {
        return reservationRepository.findByNotes(notes);
    }

}
