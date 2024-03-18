package com.v1.ChildrenCare.restController;

import com.v1.ChildrenCare.configuration.Security.CustomUserDetails;
import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.enumPack.enumRole;
import com.v1.ChildrenCare.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")
public class AccountRestController {
    @Autowired
    private AccountService accountService;

    public AccountRestController(AccountService accountService) {
        this.accountService = accountService;
    }
    //List<String>
    //Account
    @PostMapping("/addAccount")
    public ResponseEntity<Result> addAccount(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");

        Long Created_By_UserId= 0L;

        List<enumRole> roleList= new ArrayList<>();
        roleList.add(enumRole.USER);
        return accountService.createAccount(Created_By_UserId,email, password,roleList);
    }
    @PostMapping("/addAccountByAdmin")
    public ResponseEntity<Result> addAccountByAdmin(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");
        List<String> roles = (List<String>) requestBody.get("lsRole");
        // lấy user từ token login nếu chưa có user nào trong token thì set Modified_By_UserId =0
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        List<enumRole> roleList= new ArrayList<>();
        for (String r :roles){
            roleList.add(enumRole.valueOf(r));
        }
        return accountService.createAccount(userDetails.getAccount().getId(),email, password,roleList);
    }



    //Page<Account>
    @PostMapping("/searchAccount")
    public ResponseEntity<Result> searchAccount(@RequestParam(name = "UserId" ,required = false) Long UserId,
                                                @RequestParam(value = "email", required = false) String email,
                                                @RequestParam(name = "targetPageNumber", required = false) Integer targetPageNumber) {
        if (targetPageNumber ==null) {
            targetPageNumber=0;
        }
        Pageable pageable = PageRequest.of(targetPageNumber, 20);
        return accountService.searchAccount(UserId,email, pageable);
    }
    @PutMapping("/updateAccount")
    public ResponseEntity<Result> updateAccount(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");
        List<String> roles = (List<String>) requestBody.get("lsRole");

        // lấy user từ token login nếu chưa có user nào trong token thì set Modified_By_UserId =0
        Long Modify_By_UserId= 0L;
        List<enumRole> roleList= new ArrayList<>();
        for (String r :roles){
            roleList.add(enumRole.valueOf(r));
        }
        return accountService.updateAccount(Modify_By_UserId,email, password, roleList);
    }

    //boolean
    @PostMapping("/resetPassword")
    public ResponseEntity<Result> resetPassword(@RequestParam(name = "email") String email) {
        return accountService.resetPassword(email);
    }
    //boolean
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<Result> deleteAccount(@RequestParam(name = "email") String email) {
        return accountService.deleteAccount(email);
    }
    @PostMapping("/verifyEmail")
    public ResponseEntity<Result> verifyEmail(
            @RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String code = (String) requestBody.get("code");
        return accountService.verifyEmail(email,code);
    }
    @PostMapping("/resendVerifyEmail")
    public ResponseEntity<Result> resendVerifyEmail(
            @RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        return accountService.resendVerifyEmail(email);
    }


}
