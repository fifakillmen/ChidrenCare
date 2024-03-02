package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PostService {
    List<PostDto> getAllPost(int page, int size, Long categoryId, Long authorId, String status, String search);

    PostDto addPost(String createByUserId, String title, String content, MultipartFile imageFile);

    PostDto updatePost(Long modifiedByUserId, Long postId, String title, String content, MultipartFile imageFile);

    boolean deletePost(Long postId);

    PostDto findPostById(Long postId);


    Page<PostDto> searchPosts(String title, Optional<Long> categoryId, Optional<Long> authorId,
                              Optional<String> status, Pageable pageable);
}
