package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumGender;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public interface UserService {
    UserDto addUser(String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender);


    UserDto updateUser(Long UserId,String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender);

    boolean deleteUser(Long UserId);

    User findUserByEmail(String email);

    Page<UserDto> searchUser(Long UserId, String username,String firstName, String lastName, String email, LocalDate dob, Pageable pageable);
}
