package com.v1.ChildrenCare.services;

import com.v1.ChildrenCare.entity.User;
import com.v1.ChildrenCare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        // Logic để kiểm tra hoặc xử lý trước khi lưu vào cơ sở dữ liệu (nếu cần)

        // Gọi phương thức save của UserRepository để lưu user vào cơ sở dữ liệu
        return userRepository.save(user);
    }
}
