package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.dto.mapper.UserListMapper;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.repository.UserRepository;
import com.v1.ChildrenCare.service.StorageService;
import com.v1.ChildrenCare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserListMapper userListMapper;
    private final StorageService storageService;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserListMapper userListMapper, StorageService storageService) {
        this.userRepository = userRepository;
        this.userListMapper = userListMapper;
        this.storageService = storageService;
    }
    @Override
    public UserDto addUser(Long Create_By_UserId,String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        User user = new User();
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setDob(dob);
        user.setPhone(phone);
        user.setAddress(address);
        user.setGender(gender);
        user.setIsActive(enumActive.ACTIVE);
        user= userRepository.save(user);
        if (Create_By_UserId!=0L){
           User created_user= userRepository.findUserById(Create_By_UserId);
           user.setCreatedBy(created_user);
           user= userRepository.save(user);
        }
        if (avatarFile != null) {
          user= updateAvatar(user.getId(), avatarFile);
        }
        return userListMapper.UserToUserDto(user);
    }

    @Override
    public UserDto updateUser(Long Modified_By_UserId,Long UserId, String username, String firstName, String lastName, LocalDate dob, String phone, String address, MultipartFile avatarFile, enumGender gender) {
        User user = userRepository.findUserById(UserId);
        if (user != null) {
            User ModifiedBy= userRepository.findUserById(Modified_By_UserId);
            if (Modified_By_UserId!=null){
                if (user.getModifiedBy()!=null){
                    user.getModifiedBy().add(ModifiedBy);
                }else {
                    List<User> ModifiedBys= new ArrayList<>();
                    ModifiedBys.add(ModifiedBy);
                    user.setModifiedBy(ModifiedBys);
                }
            }
            if (username!=null){
                user.setUsername(username);
            }
            if (firstName!=null){
                user.setFirstName(firstName);
            }
            if (lastName!=null){
                user.setLastName(lastName);
            }
            if (dob!=null){
                user.setDob(dob);
            }
            if (phone!=null){
                user.setPhone(phone);
            }
            if (address!=null){
                user.setAddress(address);
            }
            if (gender!=null){
                user.setGender(gender);
            }
           user= userRepository.save(user);
            if (avatarFile!=null){
                user = updateAvatar(user.getId(),avatarFile);
            }
            return userListMapper.UserToUserDto(user);
        } else {
            return null;
        }    }

    @Override
    public boolean deleteUser(Long UserId) {
        User user = userRepository.findUserById(UserId);
        if (user != null) {
            userRepository.delete(user);
            if (user.getFirstName()!=null){
                deleteAvatar(user.getId(),user.getAvatarFileName());
            }
            return true;
        }
        return false;    }

    @Override
    public UserDto findUserByEmail(String email) {
        User user= userRepository.findUserByAccount_Email(email);
        return userListMapper.UserToUserDto(user);
    }

    @Override
    public Page<UserDto> searchUser(Long UserId, String username, String firstName, String lastName, String email, LocalDate dob, Pageable pageable) {
        Page<User> users = userRepository.search(UserId, username, firstName, lastName,email,dob, pageable);
        return users.map(userListMapper::UserToUserDto);
    }
    @Async
    public User updateAvatar(Long userId,MultipartFile avatar){
        User user= userRepository.findUserById(userId);
        if (user.getAvartaLink()!=null){
            storageService.deleteFile(user.getAvatarFileName());
        }
        String fileName=storageService.uploadFile(avatar);
        user.setAvatarFileName(fileName);
        user.setAvartaLink(storageService.getFileLink(fileName));

      return   userRepository.save(user);
    }
    @Async
    public void deleteAvatar(Long userId,String avatarFileName){
        User user= userRepository.findUserById(userId);
        storageService.deleteFile(avatarFileName);
    }
}
