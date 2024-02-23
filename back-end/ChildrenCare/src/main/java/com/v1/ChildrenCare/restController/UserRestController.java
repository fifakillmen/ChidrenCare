package com.v1.ChildrenCare.restController;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public synchronized UserDto addUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "dob") String dobString,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "gender") String gender,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) throws IOException, GeneralSecurityException {
        // lấy user từ token login nếu chưa có user nào trong login thì set Create_By_UserId =0
        Long Create_By_UserId= 0L;
        LocalDate dob = LocalDate.parse(dobString, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        return userService.addUser(Create_By_UserId, username,firstName,lastName,dob,phone,address,avatarFile, enumGender.valueOf(gender));
    }

    @PostMapping("/searchUser")
    public Page<UserDto> searchUser(
            @RequestParam(name = "UserId",required = false) Long UserId,
            @RequestParam(name = "username",required = false) String username,
            @RequestParam(name = "firstName",required = false) String firstName,
            @RequestParam(name = "lastName",required = false) String lastName,
            @RequestParam(name = "dob",required = false) String dobString,
            @RequestParam(name = "email",required = false) String email,
            @RequestParam(name = "targetPageNumber") Integer targetPageNumber
    ) {

        if (targetPageNumber < 0) {
            return null;
        }
        LocalDate dob = LocalDate.parse(dobString, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        Pageable pageable = PageRequest.of(targetPageNumber, 10);
        return userService.searchUser(UserId,username,firstName,lastName,email,dob,pageable);
    }

    @PutMapping("/updateUser")
    public synchronized UserDto updateUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "UserId") Long UserId,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "dob") String dobString,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "gender") String gender,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) throws Exception {
        // lấy user từ token login nếu chưa có user nào trong token thì set Modified_By_UserId =0
        Long Modified_By_UserId= 0L;
        LocalDate dob = LocalDate.parse(dobString, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        return userService.updateUser(Modified_By_UserId, UserId,  username,  firstName,  lastName,  dob,  phone,  address,  avatarFile,  enumGender.valueOf(gender));
    }

    @DeleteMapping("/deleteUser")
    public synchronized boolean deleteUser(@RequestParam(name = "UserId") Long UserId) {
        return userService.deleteUser(UserId);
    }
}
