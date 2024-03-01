package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.dto.mapper.PostListMapper;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.repository.PostRepository;
import com.v1.ChildrenCare.service.PostService;
import com.v1.ChildrenCare.service.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final PostListMapper postListMapper;
    private final StorageService storageService;


    public PostServiceImpl(PostRepository postRepository, PostListMapper postListMapper, StorageService storageService) {
        this.postRepository = postRepository;
        this.postListMapper = postListMapper;
        this.storageService = storageService;
    }


    @Override
    public PostDto addPost(Long createByUserId, String title, String content, MultipartFile imageFile) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setCreatedDate(LocalDate.now());
        post.setUpdatedDate(LocalDate.now());
        post.setIsActive(enumActive.ACTIVE);

        // Handle image file upload
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageFileName = storageService.uploadFile(imageFile); // Store image using StorageService
            post.setImageLink(imageFileName);
        }

        post = postRepository.save(post);
        return postListMapper.postToPostDto(post);
    }




    @Override
    public PostDto updatePost(Long modifiedByUserId, Long postId, String title, String content, MultipartFile imageFile) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            post.setTitle(title);
            post.setContent(content);
            post.setUpdatedDate(LocalDate.now());

            // Handle image file update
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageFileName = storageService.uploadFile(imageFile); // Store new image
                // Delete old image if needed
                if (post.getImageLink() != null) {
                    storageService.deleteFile(post.getImageLink());
                }
                post.setImageLink(imageFileName);
            }

            post = postRepository.save(post);
            return postListMapper.postToPostDto(post);
        }
        return null;
    }

    @Override
    public boolean deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            postRepository.delete(post);
            return true; // Post successfully deleted
        }
        return false; // Post not found or failed to delete
    }

    @Override
    public PostDto findPostById(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            return postListMapper.postToPostDto(post);
        }
        return null; // Post not found
    }

    @Override
    public Page<PostDto> searchPosts(String title, Optional<Long> categoryId, Optional<Long> authorId,
                                     Optional<String> status, Pageable pageable) {
        // Perform search based on the provided criteria
        Page<Post> posts = postRepository.searchPosts(title, categoryId.orElse(null), authorId.orElse(null), status.orElse(null), pageable);
        return posts.map(postListMapper::postToPostDto);
    }
}