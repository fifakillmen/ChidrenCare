package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Blog;
import com.v1.ChildrenCare.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    @Query("SELECT b FROM Blog b WHERE b.title LIKE %:search% OR b.briefContent LIKE %:search% AND (b.post.category.id = :categoryId OR :categoryId IS NULL)")
    Page<Blog> findAllBlog(Pageable pageable, @Param("search") String search, @Param("categoryId") Long categoryId);
}
