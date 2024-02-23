package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumRole;
import com.v1.ChildrenCare.repository.AccountRepository;
import com.v1.ChildrenCare.repository.RoleRepository;
import com.v1.ChildrenCare.repository.UserRepository;
import com.v1.ChildrenCare.service.AccountService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository,
                              UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    private Account uRole(List<enumRole> roles, Account account) {
        List<Role> lRole = new ArrayList<>();
        for (enumRole r : roles) {
            Role ro = roleRepository.findRoleByName(r);
            if (ro != null) {
                lRole.add(ro);
            }
        }
        account.setRole(lRole);
        return account;
    }

    @Override
    public List<String> searchEmailNoConnected(String email) {
        return accountRepository.searchEmailNoConnected(email);
    }

    @Override
    public Account createAccount(Long Created_By_UserId, String email, List<enumRole> roles) {
        if (accountRepository.findByEmail(email) == null) {
            Account account = new Account();
            account.setEmail(email);
            account.setPassword(passwordEncoder.encode(generateRandomPassword()));
            account.setIsActive(enumActive.INACTIVE);
            account.setAccessTokenActive(false);
            account = uRole(roles, account);
            if (Created_By_UserId!=0){
               User crU= userRepository.findUserById(Created_By_UserId);
               if(crU!=null) account.setCreatedBy(crU);
            }
            account.setCreatedDate(LocalDate.now());
            return accountRepository.save(account);
        }
        return null;
    }

    @Override
    public Account updateAccount(Long modify_By_UserId, String email, String password, List<enumRole> roles) {
        Account account = accountRepository.findByEmail(email);
        if (account != null) {
            if (password != null) {
                account.setPassword(passwordEncoder.encode(password));
            }
            if (! roles.isEmpty()) {
                account = uRole(roles, account);
            }
            if (modify_By_UserId!=0){
                User mdU= userRepository.findUserById(modify_By_UserId);
                if(mdU!=null){
                 if(mdU.getModifiedBy()==null){
                     account.setModifiedBy(new ArrayList<User>());
                 }
                    account.getModifiedBy().add(mdU);
                }
            }
            return accountRepository.save(account);
        }
        return null;    }

    @Override
    public Boolean resetPassword(String oldEmail) {
        Account account = accountRepository.findByEmail(oldEmail);
        if (account != null) {
            account.setPassword(passwordEncoder.encode(generateRandomPassword()));
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteAccount(String email) {
        Account account = accountRepository.findByEmail(email);
        if (account != null) {
            accountRepository.delete(account);
            return true;
        }
        return false;
    }

    @Override
    public Page<Account> searchAccount(String email, Pageable pageable) {
        return accountRepository.searchWithEmail(email, pageable);
    }

    private String generateRandomPassword() {
        int length = 10;

        String lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
        String upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String numbers = "0123456789";
        String specialChars = "!@#$%^&*()";

        String allChars = lowerCaseChars + upperCaseChars + numbers + specialChars;

        Random random = new Random();

        char[] password = new char[length];

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(allChars.length());
            password[i] = allChars.charAt(randomIndex);
        }
        return new String(password);
    }
}
