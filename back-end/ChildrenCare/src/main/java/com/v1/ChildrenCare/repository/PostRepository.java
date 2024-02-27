package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p ")
    Page<Post> searchPosts(@Param("title") String title,
                           @Param("categoryId") Long categoryId,
                           @Param("authorId") Long authorId,
                           @Param("status") String status,
                           Pageable pageable);


}
