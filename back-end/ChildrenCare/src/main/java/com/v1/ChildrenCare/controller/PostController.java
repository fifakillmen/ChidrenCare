package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.model.request.CreatePostRequest;
import com.v1.ChildrenCare.services.PostService;
import jakarta.annotation.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/posts")
public class PostController {


    @Resource
    private PostService postSerivce;

    @GetMapping("/list")
    public ResponseEntity<List<Post>> getAllPosts() {
        return postSerivce.getAllPosts(); // Call the correct method on PostService
    }

    @GetMapping("/{postid}")
    public Post getPost(@PathVariable("postid") long id)
    {
        return postSerivce.detailPost(id);
    }

    @DeleteMapping("/{postid}")
    public ResponseEntity<Result> deletePost(@PathVariable("postid") long postid)
    {
       return postSerivce.delete(postid);
    }

    @PostMapping(value = "/createPost")
    public ResponseEntity<Result> createAndEditPost(@RequestBody CreatePostRequest request) {
        return postSerivce.createAndEdit(request);
    }
}

