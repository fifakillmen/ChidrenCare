package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Các phương thức mặc định của JpaRepository có thể được sử dụng, ví dụ như save(), findById(), findAll(),...
}
