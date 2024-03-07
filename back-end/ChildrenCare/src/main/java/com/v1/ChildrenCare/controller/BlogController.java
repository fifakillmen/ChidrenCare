package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.dto.response.GeneralResponse;
import com.v1.ChildrenCare.service.BlogService;
import com.v1.ChildrenCare.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @GetMapping("/getList")
    public ResponseEntity<GeneralResponse<Object>> getListBlog(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "search", defaultValue = "") String search) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(blogService.findAll(page, size, categoryId, search)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<GeneralResponse<Object>> getBlogDetail(@RequestParam("id") Long id) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(blogService.getBlogById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<GeneralResponse<Object>> addBlog(@RequestParam("createByUserId") String createByUserId,
                                                          @RequestParam("title") String title,
                                                          @RequestParam("briefContent") String briefContent,
                                                          @RequestParam("imageFile") MultipartFile imageFile,
                                                          @RequestParam("postId") Long postId) {
        try {
            return ResponseEntity.ok(GeneralResponse.of(blogService.addBlog(createByUserId, title, briefContent, imageFile, postId)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(GeneralResponse.of(e));
        }
    }
}
