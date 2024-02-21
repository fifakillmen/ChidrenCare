package com.v1.ChildrenCare.Repository;


import com.v1.ChildrenCare.entity.Reservation;
import com.v1.ChildrenCare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Id(int userId);
    List<Reservation> findByTotalPrice(Double totalPrice);
    List<Reservation> findByNotes(String notes);
    List<Reservation> findByCreatedDate(LocalDate createdDate);
    List<Reservation> findByCreatedBy(User createdBy);
    List<Reservation> findByModifiedBy(User modifiedBy);
    List<Reservation> findByLastModifiedDate(LocalDate lastModifiedDate);

}