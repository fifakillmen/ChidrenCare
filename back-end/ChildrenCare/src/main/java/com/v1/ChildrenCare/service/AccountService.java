package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {

    ResponseEntity<Result> createAccount(Long Created_By_AccountId,String email,String password, List<enumRole> roles);

    ResponseEntity<Result> updateAccount(Long modify_By_UserId,Long accountId, String email, String password, List<String> roles, enumActive isActivity, Boolean accessTokenActive);

    ResponseEntity<Result> forgotPassword(String email);

    ResponseEntity<Result> deleteAccount(String email);

    ResponseEntity<Result> searchAccount(Long UserId,String email, Pageable pageable);

    ResponseEntity<Result> verifyEmail(String email, String code);

    ResponseEntity<Result> resendVerifyEmail(String email);

    ResponseEntity<Result> changePassword(String email, String currentPassword, String newPassword);

    ResponseEntity<Result> changePasswordWithToken(String token , String newPassword);
}
