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
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Post findPostById(Long id);
    @Query("SELECT p FROM Post p ")
    Page<Post> searchPosts(@Param("title") String title,
                           @Param("categoryId") Long categoryId,
                           @Param("authorId") Long authorId,
                           @Param("status") String status,
                           Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.title LIKE %:title% AND (:categoryId is NULL OR p.category.id = :categoryId) AND (:authorId is NULL OR p.author = :authorId) AND (:status is NULL OR p.isActive = :status)")
    List<Post>  getPostByFilter(@Param("title") String title,
                                @Param("categoryId") Long categoryId,
                                @Param("authorId") Long authorId,
                                @Param("status") String status,
                                Pageable pageable);


}
