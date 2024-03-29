package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.enumPack.enumGender;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public interface UserService {
    ResponseEntity<Result> addUser(String email, Long Create_By_UserId, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender);


    ResponseEntity<Result> updateUser(Long Modified_By_UserId,Long UserId, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender);


    UserDto findUserByEmail(String email);

    ResponseEntity<Result> searchUser(String firstName, String lastName, String email, LocalDate dob, Pageable pageable);

    ResponseEntity<Result> findUser(Long userId);
}
