package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Feedback;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.enumPack.enumResultStatus;
import com.v1.ChildrenCare.request.CreateFeedbackRequest;
import com.v1.ChildrenCare.repository.FeedbackRepository;
import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeedbackService {
    @Resource
    private FeedbackRepository feedbackRepository;

    public ResponseEntity<Result> getAllFeedback() {
        return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, feedbackRepository.findAll()));
    }

    public ResponseEntity<Result> createAndEdit(CreateFeedbackRequest request) {
        try {
            createAndEditFeedback(request);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    public ResponseEntity<Result> delete(Long id) {
        try {
            deleteFeedback(id);
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, null));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    public ResponseEntity<Result> detail(Long id) {
        try {
            return ResponseEntity.ok(new Result("SUCCESS", enumResultStatus.OK, detailFeedback(id)));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Result(e.getMessage(), enumResultStatus.NOT_FOUND, null));
        }
    }

    private void createAndEditFeedback(CreateFeedbackRequest request) {
        Feedback feedback = null;
        if (request.getId() != null) {
            feedback = feedbackRepository.findById(request.getId()).orElse(null);
            if (feedback == null) {
                throw new NullPointerException("Not found feedback");
            }
            feedback.setIsActive(enumActive.valueOf(request.getIsActive()));
        } else {
            feedback = new Feedback();
            feedback.setIsActive(enumActive.valueOf(request.getIsActive()));
        }
        feedback.setCreatedDate(LocalDateTime.now());
        feedback.setRating(request.getRating());
        feedback.setEmail(request.getEmails());
        feedback.setFullname(request.getFullname());
        feedback.setMobile(request.getMobile());
        feedback.setReviewText(request.getReviewText());
        feedback.setGender(enumGender.valueOf(request.getGender()));
        feedback.setService(request.getService());
        feedbackRepository.save(feedback);
    }

    private void deleteFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback == null) {
            throw new NullPointerException("Not found feedback");
        }
        feedbackRepository.delete(feedback);
    }

    private Feedback detailFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback == null) {
            throw new NullPointerException("Not found feedback");
        }
        return feedback;
    }
}
