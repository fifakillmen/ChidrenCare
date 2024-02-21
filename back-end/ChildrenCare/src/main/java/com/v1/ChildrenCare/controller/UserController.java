package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
