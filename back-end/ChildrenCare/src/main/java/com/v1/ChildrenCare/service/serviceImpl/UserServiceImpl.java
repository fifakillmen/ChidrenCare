package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserDto addUser(String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        return null;
    }

    @Override
    public UserDto updateUser(Long UserId, String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        return null;
    }

    @Override
    public boolean deleteUser(Long UserId) {
        return false;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public Page<UserDto> searchUser(Long UserId, String username, String firstName, String lastName, String email, LocalDate dob, Pageable pageable) {
        return null;
    }
}
