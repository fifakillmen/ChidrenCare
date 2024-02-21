package com.v1.ChildrenCare.services;


import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.model.request.CreatePostRequest;
import com.v1.ChildrenCare.repository.PostRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    @Resource
    private PostRepository postRepository;

    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return ResponseEntity.ok(posts);
    }
    public ResponseEntity<Result> detail(Long id) {
        try {
            return ResponseEntity.ok(new Result("SUCCESS", "OK", detailPost(id)));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), "NOT_FOUND", null));
        }
    }
    public Post detailPost(Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent() && !ObjectUtils.isEmpty(optionalPost.get())) {
            return optionalPost.get();
        }
        return null;
    }


    public ResponseEntity<Result> delete(Long id) {
        try {
            deletePost(id);
            return ResponseEntity.ok(new Result("SUCCESS", "OK", null));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), "NOT_FOUND", null));
        }

    }

    private void deletePost(Long id) {
        Post post = postRepository.findById(id).orElse(null);
        if (post == null) {
            throw new NullPointerException("Not found Post");
        }
        postRepository.delete(post);
    }

    public ResponseEntity<Result> createAndEdit(CreatePostRequest request) {
    Post post = new Post();
    if (request.getId() != null) {
        Optional<Post> optionalPost = postRepository.findById(request.getId());
        if (optionalPost.isPresent() && ObjectUtils.isEmpty(optionalPost.get())) {
            post = optionalPost.get();
        }
    }
    post.setCreatedDate(LocalDateTime.now());
    post.setTitle(request.getTitle());
    post.setContent(request.getContent());
    post.setImageLink(request.getImageLink());
    postRepository.save(post);

    // Create a Result object indicating success
    Result result = new Result("SUCCESS", "Post created successfully", post);
    return new ResponseEntity<>(result, HttpStatus.OK);
}
}
