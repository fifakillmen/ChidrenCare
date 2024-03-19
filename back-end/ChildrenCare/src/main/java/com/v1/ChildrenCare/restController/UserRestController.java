package com.v1.ChildrenCare.restController;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@RestController
@RequestMapping("/user")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public synchronized ResponseEntity<Result> addUser(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "dob") String dobString,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "gender") String gender,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) throws IOException, GeneralSecurityException {
        Long Create_By_UserId= 0L;
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate dob = LocalDate.parse(dobString, formatter);
        return userService.addUser(email,Create_By_UserId, firstName,lastName,dob,phone,address,avatarFile, enumGender.valueOf(gender));
    }

    @PostMapping("/addUserByAdmin")
    public synchronized ResponseEntity<Result> addUser(
            @RequestParam(name = "AdminId") Long adminId,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "dob") String dobString,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "gender") String gender,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) throws IOException, GeneralSecurityException {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate dob = LocalDate.parse(dobString, formatter);
        return userService.addUser(email,adminId, firstName,lastName,dob,phone,address,avatarFile, enumGender.valueOf(gender));
    }


    @PostMapping("/searchUser")
    public ResponseEntity<Result> searchUser(
            @RequestParam(name = "firstName", required = false) String firstName,
            @RequestParam(name = "lastName", required = false) String lastName,
            @RequestParam(name = "dob", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "targetPageNumber") Integer targetPageNumber
    ) {
        if (targetPageNumber < 0) {
            return ResponseEntity.badRequest().body(new Result("Invalid page number", enumResultStatus.OK,null));
        }

        Pageable pageable = PageRequest.of(targetPageNumber, 10);
        return userService.searchUser(firstName, lastName, email, dob, pageable);
    }


    @PutMapping("/updateUser")
    public synchronized  ResponseEntity<Result> updateUser(
            @RequestParam(name = "UserId") Long UserId,
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "dob") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
            @RequestParam(name = "phone") String phone,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "gender") String gender,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) throws Exception {
        // lấy user từ token login nếu chưa có user nào trong token thì set Modified_By_UserId =0
        Long Modified_By_UserId= 0L;

        return userService.updateUser(Modified_By_UserId, UserId,  firstName,  lastName,  dob,  phone,  address,  avatarFile,  enumGender.valueOf(gender));
    }

}
