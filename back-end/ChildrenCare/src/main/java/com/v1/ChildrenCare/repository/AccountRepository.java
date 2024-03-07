package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Account;
import com.v1.ChildrenCare.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmail(String email);

    @Query("""
			SELECT a from Account a where (:email like '' or 
											:email is null or
											 a.email like concat('%',:email,'%') )
			""")
    Page<Account> searchWithEmail(@Param("email") String email, Pageable pageable);

}