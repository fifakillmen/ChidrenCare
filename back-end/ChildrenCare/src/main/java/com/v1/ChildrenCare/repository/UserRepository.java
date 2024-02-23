package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(Long id);

    User findUserByAccount_Email(String email);
    @Query("""
			select us
			FROM User us
            LEFT JOIN FETCH us.account a
			WHERE ( :UserId like '' or :userId IS NULL OR us.id = :userId)
			  AND ( :username like '' or :username IS NULL OR us.username LIKE CONCAT('%', :username, '%'))
			  AND ( :firstName like '' or :firstName IS NULL OR us.firstName = :firstName)
			  AND ( :lastName like '' or :lastName IS NULL OR us.lastName = :lastName)
			  AND ( :email like '' or :email IS NULL OR a.email LIKE CONCAT('%', :email, '%'))
			  AND ( :dob IS NULL OR us.dob = :dob)
			""")
    Page<User> search(@Param("UserId") Long UserId,
                      @Param("username") String username,
                      @Param("firstName") String firstName,
                      @Param("lastName") String lastName,
                      @Param("email") String email,
                      @Param("dob") LocalDate dob,
                      Pageable pageable);
}
