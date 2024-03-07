package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.dto.response.GeneralResponse;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/manager/post")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/getList")
    public ResponseEntity<GeneralResponse> getListPost(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "authorId", required = false) Long authorId,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value  = "search", defaultValue = "") String search
    ) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(postService.getAllPost(page, size, categoryId, authorId, status, search)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<GeneralResponse> getPostDetail(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(postService.findPostById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<GeneralResponse> createPost(
            @RequestParam("createByUserId") String createByUserId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(postService.addPost(createByUserId, title, content, imageFile)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<GeneralResponse> updatePost(@RequestParam("modifiedByUserId") Long modifiedByUserId,
                                                              @RequestParam("postId") Long postId,
                                                              @RequestParam("title") String title,
                                                              @RequestParam("content") String content,
                                                              @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(postService.updatePost(modifiedByUserId, postId, title, content, imageFile)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<GeneralResponse> deletePost(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(postService.deletePost(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }
}
