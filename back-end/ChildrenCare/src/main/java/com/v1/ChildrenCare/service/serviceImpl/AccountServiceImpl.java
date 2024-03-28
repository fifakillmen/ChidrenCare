package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.mapper.AccountListMapper;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountServiceImpl implements AccountService {
    private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%^&*()";
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AccountListMapper accountListMapper;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository, UserRepository userRepository, EmailService emailService, AccountListMapper accountListMapper) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.accountListMapper = accountListMapper;
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
    public ResponseEntity<Result> createAccount(Long Created_By_AccountId, String email,String password, List<enumRole> roles) {

        try{
            if (accountRepository.findByEmail(email) == null) {
                Account account = new Account();
                account.setEmail(email);
                account.setPassword(passwordEncoder.encode(password));
                account.setIsActive(enumActive.INACTIVE);
                account.setAccessTokenActive(false);
                account.setVerifiEmailCode(generateRandomCode());
                account = uRole(roles, account);
                if (Created_By_AccountId!=0){
                    Account crA= accountRepository.findAccountByUserId(Created_By_AccountId);
                    if(crA!=null){
                        account.setIsActive(enumActive.ACTIVE);
                        account.setVerifiEmailCode(null);
                        account.setCreatedBy(crA);
                    }
                }
                account.setCreatedDate(LocalDate.now());
                account=accountRepository.save(account);

                emailService.sendVerifyAccount(account.getEmail(),account.getVerifiEmailCode());
                return  ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,account));
            }
            return  ResponseEntity.ok(new Result("Email is used", enumResultStatus.ERROR,null));
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
    public ResponseEntity<Result> updateAccount(Long modify_By_UserId, String email, String password, List<String> roles, enumActive isActive, Boolean accessTokenActive) {
        try {
            Account account = accountRepository.findByEmail(email);
            if (account != null) {
                if (password != null) {
                    account.setPassword(passwordEncoder.encode(password));
                }
                if (!roles.isEmpty()) {
                    List<Role> newRoles = new ArrayList<>();
                    for (String r : roles) {
                        newRoles.add(roleRepository.findRoleByName(enumRole.valueOf(r)));
                    }
                    account.setRole(newRoles);
                }

                if (modify_By_UserId != 0) {
                    User mdU = userRepository.findUserById(modify_By_UserId);
                    if (mdU != null) {
                        account.setModifiedBy_UserId(mdU.getId());
                    }
                }
                if (isActive != null) {
                    account.setIsActive(isActive);
                }
                if (accessTokenActive != null) {
                    account.setAccessTokenActive(accessTokenActive);
                }
                return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, accountRepository.save(account)));
            }
            return ResponseEntity.ok(new Result("Cannot find Account", enumResultStatus.ERROR, null));
        } catch (Exception ex) {
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.ok(new Result("Validate value of account in update Account", enumResultStatus.ERROR, null));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.ok(new Result("Validate value of account in update Account", enumResultStatus.ERROR, null));

            } else {
                // Các lỗi khác
                return ResponseEntity.ok(new Result(ex.getMessage(), enumResultStatus.ERROR, null));
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
    public ResponseEntity<Result> searchAccount(Long UserId,String email, Pageable pageable) {
        if (UserId!=null&&email==null){
            return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,accountListMapper.AccountToAccountDto(accountRepository.searchAccountWithUserId(UserId))));
        }
        return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,accountRepository.searchWithEmail(email, pageable)));
    }

    @Override
    public ResponseEntity<Result> verifyEmail(String email, String code) {
        try{
            Account account= accountRepository.findByEmail(email);
            if(account!=null){
                if(account.getVerifiEmailCode().equals(code)){
                    account.setVerifiEmailCode(null);
                    account.setIsActive(enumActive.ACTIVE);
                    accountRepository.save(account);
                    return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,true));
                }else {
                    return ResponseEntity.ok(new Result("Verify code is wrong",enumResultStatus.NOT_FOUND,false));
                }
            }else{
                return ResponseEntity.ok(new Result("Cannot find Account",enumResultStatus.OK,null));
            }
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in verify Email", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in verify Email", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }
    }

    @Override
    public ResponseEntity<Result> resendVerifyEmail(String email) {
        try{
            Account account= accountRepository.findByEmail(email);
            if(account!=null){
                account.setVerifiEmailCode(generateRandomCode());
//                emailService.sendVerifyAccount(account.getEmail(),account.getVerifiEmailCode());
                accountRepository.save(account);
                return ResponseEntity.ok(new Result("SUCCESS",enumResultStatus.OK,true));
            }
            return ResponseEntity.ok(new Result("Cannot find Account",enumResultStatus.OK,null));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in resend verify Email", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in resend verify Email", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }    }


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
    private String generateRandomCode() {
        int length = 6;
        SecureRandom random = new SecureRandom();
        StringBuilder codeBuilder = new StringBuilder();

        codeBuilder.append(LOWERCASE_CHARS.charAt(random.nextInt(LOWERCASE_CHARS.length())));
        codeBuilder.append(UPPERCASE_CHARS.charAt(random.nextInt(UPPERCASE_CHARS.length())));
        codeBuilder.append(NUMBERS.charAt(random.nextInt(NUMBERS.length())));
        codeBuilder.append(SPECIAL_CHARS.charAt(random.nextInt(SPECIAL_CHARS.length())));

        for (int i = 4; i < length; i++) {
            String allChars = LOWERCASE_CHARS + UPPERCASE_CHARS + NUMBERS + SPECIAL_CHARS;
            codeBuilder.append(allChars.charAt(random.nextInt(allChars.length())));
        }

        String code = codeBuilder.toString();
        char[] codeArray = code.toCharArray();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(length);
            char temp = codeArray[i];
            codeArray[i] = codeArray[randomIndex];
            codeArray[randomIndex] = temp;
        }
        return new String(codeArray);
    }

}
