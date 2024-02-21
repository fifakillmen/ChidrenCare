package com.v1.ChildrenCare.repository;

import com.v1.ChildrenCare.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
