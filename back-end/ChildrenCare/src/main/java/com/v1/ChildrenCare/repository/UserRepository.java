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
	@Query("""
            select u from User u join Account a on u.id = a.user.id where a.email like :email
            """)
    User getUserWithEmail(@Param("email") String email);
    @Query("""
			select us
			FROM User us
			WHERE 
			  ( :firstName like '' or :firstName IS NULL OR us.firstName = :firstName)
			  AND ( :lastName like '' or :lastName IS NULL OR us.lastName = :lastName)
			  AND ( :dob IS NULL OR us.dob = :dob)
			""")
    Page<User> search(
                      @Param("firstName") String firstName,
                      @Param("lastName") String lastName,
                      @Param("dob") LocalDate dob,
                      Pageable pageable);
	@Query("""
		select u from User u where u.id=:userID
	""")
	User findUserWithUserID(@Param("userID") Long userID);
}
