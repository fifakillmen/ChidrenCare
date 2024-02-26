package com.v1.ChildrenCare.restController;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.enumPack.enumRole;
import com.v1.ChildrenCare.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/searchEmailNoConnected")
    public ResponseEntity<Result> searchEmailNoConnected(@RequestParam(name = "email") String email) {
        return accountService.searchEmailNoConnected(email);
    }
    //Account
    @PostMapping("/addAccount")
    public ResponseEntity<Result> addAccount(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        List<String> roles = (List<String>) requestBody.get("lsRole");
        // lấy user từ token login nếu chưa có user nào trong token thì set Modified_By_UserId =0
        Long Created_By_UserId= 0L;
        List<enumRole> roleList= new ArrayList<>();
        for (String r :roles){
            roleList.add(enumRole.valueOf(r));
        }
        return accountService.createAccount(Created_By_UserId,email, roleList);
    }
    //Page<Account>
    @PostMapping("/searchAccount")
    public ResponseEntity<Result> searchAccount(@RequestParam(value = "email", required = false) String email,
                                       @RequestParam(name = "targetPageNumber") Integer targetPageNumber) {
        if (targetPageNumber < 0) {
            return null;
        }
        Pageable pageable = PageRequest.of(targetPageNumber, 20);
        return accountService.searchAccount(email, pageable);
    }
    //Account
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
}
