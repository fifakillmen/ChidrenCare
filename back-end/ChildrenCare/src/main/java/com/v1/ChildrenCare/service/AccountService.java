package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.enumPack.enumRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountService {
    List<String> searchEmailNoConnected(String email);

    Account createAccount(Long Created_By_UserId,String email, List<enumRole> roles);

    Account updateAccount(Long modify_By_UserId,String email, String password, List<enumRole> roles);

    Boolean resetPassword(String oldEmail);

    boolean deleteAccount(String email);

    Page<Account> searchAccount(String email, Pageable pageable);

}
