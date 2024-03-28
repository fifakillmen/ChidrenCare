package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.dto.mapper.UserListMapper;
import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.repository.AccountRepository;
import com.v1.ChildrenCare.repository.UserRepository;
import com.v1.ChildrenCare.service.StorageService;
import com.v1.ChildrenCare.service.UserService;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.beans.Transient;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserListMapper userListMapper;
    private final StorageService storageService;
    private final AccountRepository accountRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserListMapper userListMapper, StorageService storageService,
                           AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.userListMapper = userListMapper;
        this.storageService = storageService;
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Result> addUser(String email, Long Create_By_UserId,  String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        try{
            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setDob(dob);
            user.setPhone(phone);
            user.setAddress(address);
            user.setGender(gender);
            user.setIsActive(enumActive.ACTIVE);
            Account account= accountRepository.findByEmail(email);
            user = userRepository.save(user);
            if (Create_By_UserId > 0L) {
                User created_user = userRepository.findUserById(Create_By_UserId);
                user.setCreatedBy(created_user);
                user = userRepository.save(user);
            }
            if (avatarFile != null) {
                user = updateAvatar(user.getId(), avatarFile);
            }
            account.setUser(user);
            accountRepository.save(account);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,userListMapper.UserToUserDto(user)));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in create User", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in create User", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public  ResponseEntity<Result> updateUser(Long Modified_By_UserId, Long UserId,  String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        try{
            User user = userRepository.findUserById(UserId);
            if (user != null) {
                if (Modified_By_UserId != 0L) {
                    User ModifiedBy = userRepository.findUserById(Modified_By_UserId);
                    if (ModifiedBy.getId()!=0){
                        user.setModifiedBy_UserId(Modified_By_UserId);
                    }
                }
                if (firstName != null) {
                    user.setFirstName(firstName);
                }
                if (lastName != null) {
                    user.setLastName(lastName);
                }
                if (dob != null) {
                    user.setDob(dob);
                }
                if (phone != null) {
                    user.setPhone(phone);
                }
                if (address != null) {
                    user.setAddress(address);
                }
                if (gender != null) {
                    user.setGender(gender);
                }
                user = userRepository.save(user);
                if (avatarFile != null) {
                    user = updateAvatar(user.getId(), avatarFile);
                }
                return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,userListMapper.UserToUserDto(user)));

            } else {
                return ResponseEntity.ok(new Result("FAIL", enumResultStatus.OK,null));
            }
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in update User", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in update User", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }
    }


    @Override
    public  UserDto findUserByEmail(String email) {
        User user = userRepository.getUserWithEmail(email);
        return userListMapper.UserToUserDto(user);
    }

    @Override
    public  ResponseEntity<Result> searchUser( String firstName, String lastName, String email, LocalDate dob, Pageable pageable) {
        try{
            if (firstName == null && lastName == null && email == null && dob == null) {
                return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,userRepository.findAll(pageable).map(userListMapper::UserToUserDto)));
            }
            Page<User> users = userRepository.search(firstName, lastName, dob, pageable);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,users.map(userListMapper::UserToUserDto)));
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in create Account", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in create Account", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }
    }

    @Override
    public ResponseEntity<Result> findUser(Long userId) {
        try{
            if (userId>0) {
                return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK,userRepository.findUserWithUserID(userId)));
            }else {
                return ResponseEntity.ok(new Result("Cannot find user", enumResultStatus.NOT_FOUND,false));
            }
        }catch (Exception ex){
            if (ex instanceof ConstraintViolationException) {
                // Lỗi validate dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Validate value of account in create Account", enumResultStatus.ERROR, ex.getMessage()));

            } else if (ex instanceof DataIntegrityViolationException) {
                // Lỗi vi phạm ràng buộc toàn vẹn dữ liệu
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Data integrity constraint violation error in create Account", enumResultStatus.ERROR, ex.getMessage()));
            } else {
                // Các lỗi khác
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result("Other Error", enumResultStatus.ERROR, ex.getMessage()));
            }
        }    }

    @Async
    public User updateAvatar(Long userId, MultipartFile avatar) {
        User user = userRepository.findUserById(userId);
        if (user.getAvartaLink() != null) {
            storageService.deleteFile(user.getAvatarFileName());
        }
        String fileName = storageService.uploadFile(avatar);
        user.setAvatarFileName(fileName);
        user.setAvartaLink(storageService.getFileLink(fileName));

        return userRepository.save(user);
    }

    @Async
    public void deleteAvatar(Long userId, String avatarFileName) {
        User user = userRepository.findUserById(userId);
        storageService.deleteFile(avatarFileName);
    }
}
