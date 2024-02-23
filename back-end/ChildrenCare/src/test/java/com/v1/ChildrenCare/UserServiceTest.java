package com.v1.ChildrenCare;

import com.v1.ChildrenCare.dto.UserDto;
import com.v1.ChildrenCare.dto.mapper.UserListMapper;
import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.repository.UserRepository;
import com.v1.ChildrenCare.service.StorageService;
import com.v1.ChildrenCare.service.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserListMapper userListMapper;

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StorageService storageService;


    @BeforeEach
    void setUp() {

    }

    @Test
    void testAddUser() {

        UserDto addedUser = userService.addUser(0L, "username", "firstName", "lastName", LocalDate.now(),
                "phone", "address", null, enumGender.Male);

        User savedUser = userRepository.findById(addedUser.getId()).get();

        assertEquals("username", savedUser.getUsername());
    }


    @Test
    void testUpdateUser() {

        UserDto updatedUser = userService.updateUser(0L, 1L, "newUsername", null, null, null, null, null, null, null);

        User savedUser = userRepository.findById(updatedUser.getId()).get();

        assertEquals("newUsername", savedUser.getUsername());

    }

    @Test
    void testDeleteUser() {

        userService.deleteUser(1L);

        User deletedUser = userRepository.findById(1L).orElse(null);

        assertNull(deletedUser);

    }

    @Test
    void testSearchUser() {

        Page<UserDto> result = userService.searchUser(null, null, null, null, null, null, Pageable.unpaged());

        List<User> savedUsers = userRepository.findAll();

        assertEquals(savedUsers.size(), result.getTotalElements());

    }

}
