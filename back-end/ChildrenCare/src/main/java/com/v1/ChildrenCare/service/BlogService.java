package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface BlogService {
    List<Blog> findAll(int page, int size, Long categoryId, String search);

    Blog getBlogById(Long blogId);

    Blog addBlog(String createByUserId, String title, String briefContent, MultipartFile imageFile, Long categoryId);

    Blog updateBlog(Long modifiedByUserId, Long blogId, String title, String briefContent, String content, MultipartFile imageFile, Long categoryId);

    boolean deleteBlog(Long blogId);
}
