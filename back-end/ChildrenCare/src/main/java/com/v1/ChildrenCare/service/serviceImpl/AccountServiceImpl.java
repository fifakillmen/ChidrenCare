package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.Role;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.enumPack.enumRole;
import com.v1.ChildrenCare.repository.AccountRepository;
import com.v1.ChildrenCare.repository.RoleRepository;
import com.v1.ChildrenCare.repository.UserRepository;
import com.v1.ChildrenCare.service.AccountService;
import com.v1.ChildrenCare.service.EmailService;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
    private final EmailService emailService;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository, UserRepository userRepository, EmailService emailService) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
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
    public ResponseEntity<Result> searchEmailNoConnected(String email) {
        return  ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,accountRepository.searchEmailNoConnected(email)));
    }

    @Override
    public ResponseEntity<Result> createAccount(Long Created_By_UserId, String email, List<enumRole> roles) {
        try{
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
                return  ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,accountRepository.save(account)));
            }
            return  ResponseEntity.ok(new Result("Email is used", enumResultStatus.OK,null));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in create Account", enumResultStatus.OK,null));
            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return  ResponseEntity.ok(new Result("Data integrity constraint violation error in create Account", enumResultStatus.OK,null));
            } else {
                // Các lỗi khác
                return  ResponseEntity.ok(new Result(ex.getMessage(), enumResultStatus.OK,null));
            }
        }

    }

    @Override
    public ResponseEntity<Result> updateAccount(Long modify_By_UserId, String email, String password, List<enumRole> roles) {
        try{
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
                        account.setModifiedBy_UserId(mdU.getId());
                    }
                }
                return  ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,accountRepository.save(account)));
            }
            return ResponseEntity.ok(new Result("Cannot find Account",enumResultStatus.OK,null));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in update Account", enumResultStatus.OK,null));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in update Account", enumResultStatus.OK,null));

            } else {
                // Các lỗi khác
                return  ResponseEntity.ok(new Result(ex.getMessage(), enumResultStatus.OK,null));
            }
        }
    }

    @Override
    public ResponseEntity<Result> resetPassword(String email) {
        try{
            Account account = accountRepository.findByEmail(email);
            if (account != null) {
                account.setPassword(passwordEncoder.encode(generateRandomPassword()));
                accountRepository.save(account);
                // gửi email về email đó link để change password
                String link= "link của server font-end dẫn đến trang đổi mật khẩu";
                emailService.sendResetPassword(account.getEmail(),link);
                return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,true));
            }
            return ResponseEntity.ok(new Result("Cannot find Account",enumResultStatus.OK,null));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in reset password", enumResultStatus.OK,null));
            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in reset password", enumResultStatus.OK,null));
            } else {
                // Các lỗi khác
                return  ResponseEntity.ok(new Result(ex.getMessage(), enumResultStatus.OK,null));
            }
        }
    }

    @Override
    public ResponseEntity<Result> deleteAccount(String email) {
        try{
            Account account = accountRepository.findByEmail(email);
            if (account != null) {
                accountRepository.delete(account);
                return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,true));
            }
            return ResponseEntity.ok(new Result("Cannot find Account",enumResultStatus.OK,null));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in delete Account", enumResultStatus.OK,null));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return  ResponseEntity.ok(new Result("Validate value of account in delete Account", enumResultStatus.OK,null));

            } else {
                // Các lỗi khác
                return  ResponseEntity.ok(new Result(ex.getMessage(), enumResultStatus.OK,null));
            }
        }




    }

    @Override
    public ResponseEntity<Result> searchAccount(String email, Pageable pageable) {
        return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,accountRepository.searchWithEmail(email, pageable)));
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
