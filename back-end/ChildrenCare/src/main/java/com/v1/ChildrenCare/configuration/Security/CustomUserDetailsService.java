package com.v1.ChildrenCare.configuration.Security;

import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.repository.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    AccountRepository accountRepository;
    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(email);
        if (account!= null) {
            return new CustomUserDetails(account);
        }else {
            return null;
        }
    }
}
