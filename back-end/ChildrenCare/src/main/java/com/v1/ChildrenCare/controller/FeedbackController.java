package com.v1.ChildrenCare.controller;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.request.CreateFeedbackRequest;
import com.v1.ChildrenCare.service.FeedbackService;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Resource
    private FeedbackService feedbackService;

    @GetMapping("/list")
    public ResponseEntity<Result> getListFeedback() {
        return feedbackService.getAllFeedback();
    }

    @PostMapping("/create")
    public ResponseEntity<Result> createAndEditFeedback(@RequestBody CreateFeedbackRequest request) {
        return feedbackService.createAndEdit(request);
    }

    @GetMapping("/delete")
    public ResponseEntity<Result> deleteFeedback(@RequestParam("id") Long id) {
        return feedbackService.delete(id);
    }

    @GetMapping("/detail")
    public ResponseEntity<Result> detailFeedback(@RequestParam("id") Long id) {
        return feedbackService.detail(id);
    }
}
