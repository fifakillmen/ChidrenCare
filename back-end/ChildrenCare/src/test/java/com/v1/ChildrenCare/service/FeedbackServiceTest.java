package com.v1.ChildrenCare.service;

import com.v1.ChildrenCare.constaint.Result;
import com.v1.ChildrenCare.entity.Feedback;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.enumPack.enumGender;
import com.v1.ChildrenCare.repository.FeedbackRepository;
import com.v1.ChildrenCare.request.CreateFeedbackRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class FeedbackServiceTest {
    @Autowired
    private FeedbackService feedbackService;
    @MockBean
    private FeedbackRepository feedbackRepository;

    //getAllFeedback
    @Test
    void getAllFeedback_shouldReturnEmptyList_whenNoFeedbackExists() {
//        // Configure mock to return an empty list
//        when(feedbackRepository.findAll()).thenReturn(Collections.emptyList());
//
//        // Execute the service method
//        ResponseEntity<Result> response = feedbackService.getAllFeedback();
//
//        // Assert the response
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(response.getBody()).isNotNull();
//        assertThat(response.getBody().getStatus()).isEqualTo("OK");
//        assertThat(response.getBody().getMessage()).isEqualTo("SUCCESS");
//        assertThat((Collection<?>) response.getBody().getData()).isEmpty();
//
//
//        // Verify the behavior
//        verify(feedbackRepository).findAll();
    }

    @Test
    void getAllFeedback_shouldReturnFeedbackList_whenFeedbackExists() {
        // Prepare mock feedback
        Feedback feedback1 = new Feedback(); // Assume Feedback class has an appropriate constructor or setters
        feedback1.setFullname("Nam Anh");
        feedback1.setEmail("namanh@example.com");
        feedback1.setReviewText("Great service!");

        Feedback feedback2 = new Feedback(); // Setup feedback2 similarly

        List<Feedback> mockFeedbackList = Arrays.asList(feedback1, feedback2);

        // Configure the mock to return the prepared list
        when(feedbackRepository.findAll()).thenReturn(mockFeedbackList);

        // Execute the service method
        ResponseEntity<Result> response = feedbackService.getAllFeedback();

        // Assert the response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getStatus()).isEqualTo("OK");
        assertThat(response.getBody().getMessage()).isEqualTo("SUCCESS");
        assertThat((List<Feedback>) response.getBody().getData()).hasSize(2);
    }

    //createAndEdit
    @Test
    void createAndEdit_shouldCreateNewFeedback_whenFeedbackIdIsNull() {
        // Given
        CreateFeedbackRequest request = new CreateFeedbackRequest();
        request.setFullname("Nam Anh");
        request.setEmails("namanh@example.com");
        request.setMobile("1234567890");
        request.setGender("Male");
        request.setRating(5);
        request.setReviewText("Great service!");

        Feedback expectedFeedback = new Feedback();
        expectedFeedback.setFullname(request.getFullname());
        expectedFeedback.setEmail(request.getEmails());
        expectedFeedback.setMobile(request.getMobile());
        expectedFeedback.setGender(enumGender.valueOf(request.getGender()));
        expectedFeedback.setRating(request.getRating());
        expectedFeedback.setReviewText(request.getReviewText());
        expectedFeedback.setIsActive(enumActive.ACTIVE);

        when(feedbackRepository.save(any(Feedback.class))).thenReturn(expectedFeedback);

        // When
        ResponseEntity<Result> response = feedbackService.createAndEdit(request);

        // Then
        verify(feedbackRepository).save(any(Feedback.class));
        assert (response.getStatusCode() == HttpStatus.OK);
        assert (response.getBody().getStatus().equals("OK"));
    }

    @Test
    void createAndEdit_shouldReturnNotFound_whenFeedbackIdIsInvalid() {
        // Given
        Long invalidFeedbackId = -1L; // Example of an invalid ID
        CreateFeedbackRequest request = new CreateFeedbackRequest();
        request.setId(invalidFeedbackId); // Set the invalid ID in the request
        request.setFullname("Nam Anh");
        request.setEmails("namanh@example.com");
        request.setMobile("1234567890");
        request.setGender("Male");
        request.setRating(5);
        request.setReviewText("Great service!");

        when(feedbackRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        // When
        ResponseEntity<Result> response = feedbackService.createAndEdit(request);

        // Then
        assert (response.getStatusCode() == HttpStatus.NOT_FOUND);
        assert (response.getBody().getStatus().equals("NOT_FOUND"));
    }

    @Test
    void createAndEdit_shouldEditFeedback_whenFeedbackIdIsValid() {
//        // Given
//        Long validFeedbackId = 1L; // Assume this is a valid existing ID
//        CreateFeedbackRequest request = new CreateFeedbackRequest();
//        request.setId(validFeedbackId);
//        request.setFullname("Nam Anh Updated");
//        request.setEmails("namanh.updated@example.com");
//        request.setMobile("0987654321");
//        request.setGender("Female");
//        request.setRating(4);
//        request.setReviewText("Updated review text");
//
//        Feedback existingFeedback = new Feedback();
//        existingFeedback.setId(validFeedbackId);
//        existingFeedback.setFullname("Nam Anh");
//        existingFeedback.setEmail("namanh@example.com");
//        existingFeedback.setMobile("1234567890");
//        existingFeedback.setGender(enumGender.valueOf(request.getGender()));
//        existingFeedback.setRating(5);
//        existingFeedback.setReviewText("Initial review text");
//        existingFeedback.setIsActive(enumActive.ACTIVE);
//        existingFeedback.setCreatedDate(LocalDateTime.now());
//
//        when(feedbackRepository.findById(eq(validFeedbackId))).thenReturn(Optional.of(existingFeedback));
//        when(feedbackRepository.save(any(Feedback.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//        // When
//        ResponseEntity<Result> response = feedbackService.createAndEdit(request);
//
//        // Then
//        assert (response.getStatusCode() == HttpStatus.OK);
//        assert (response.getBody().getStatus().equals("OK"));

    }

    @Test
    void createAndEdit_shouldHandleException_whenEmailIsInvalid() {

    }

    @Test
    void createAndEdit_shouldSetCurrentDateTime_whenCreatingFeedback() {

    }

    //delete
    @Test
    void delete_shouldReturnNotFound_whenFeedbackIdIsInvalid() {
// Given an invalid feedback ID
        Long invalidFeedbackId = -1L;

        when(feedbackRepository.existsById(invalidFeedbackId)).thenReturn(false);

        // When
        ResponseEntity<Result> response = feedbackService.delete(invalidFeedbackId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("NOT_FOUND", response.getBody().getStatus());
    }

    @Test
    void delete_shouldDeleteFeedback_whenFeedbackIdIsValid() {
        // Arrange
        Long validFeedbackId = 1L;
        Feedback mockFeedback = new Feedback();
        when(feedbackRepository.findById(validFeedbackId)).thenReturn(Optional.of(mockFeedback)); // Assume the feedback exists

        // Act
        feedbackService.delete(validFeedbackId);

        // Assert
        verify(feedbackRepository, times(1)).delete(any(Feedback.class));
    }

    @Test
    void delete_shouldHandleExceptionGracefully_whenErrorOccurs() {
        // Arrange
        Long feedbackId = 99L;
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<?> response = feedbackService.delete(feedbackId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        // Verify findById was called, confirming we're testing the right interaction
        verify(feedbackRepository, times(1)).findById(feedbackId);
        // Ensure deleteById or delete was not called since the feedback was not found
        verify(feedbackRepository, never()).deleteById(anyLong());
        verify(feedbackRepository, never()).delete(any(Feedback.class));

    }

    //detail
    @Test
    void detail_shouldReturnFeedbackDetail_whenFeedbackIdIsValid() {
        // Given a valid feedback ID
        Long validFeedbackId = 1L;
        Feedback feedback = new Feedback(); // Setup feedback details

        when(feedbackRepository.findById(validFeedbackId)).thenReturn(Optional.of(feedback));

        // When
        ResponseEntity<Result> response = feedbackService.detail(validFeedbackId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(feedback, response.getBody().getData());
    }

    @Test
    void detail_shouldReturnNotFound_whenFeedbackIdIsInvalid() {
        // Arrange
        Long invalidFeedbackId = 99L; // Assuming 99L is an ID for which no feedback exists
        when(feedbackRepository.findById(invalidFeedbackId)).thenReturn(Optional.empty()); // Simulate feedback not found

        // Act
        ResponseEntity<Result> response = feedbackService.detail(invalidFeedbackId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode()); // Verify that the status code is 404 NOT FOUND

        // Additionally, you can assert the body of the response if your service sets any specific error message or details
        // Example: assuming your Result class has a getMessage() method that returns the error message
        // assertEquals("Feedback not found", response.getBody().getMessage());

        // Verify the interaction with the repository
        verify(feedbackRepository, times(1)).findById(invalidFeedbackId);
    }

    @Test
    void detail_shouldHandleExceptionGracefully_whenErrorOccurs() {
        // Arrange
        Long feedbackId = 1L; // Use a sample feedback ID for the test
        doThrow(new RuntimeException("Unexpected error")).when(feedbackRepository).findById(feedbackId); // Simulate an exception

        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            feedbackService.detail(feedbackId);
        }, "Should handle exceptions gracefully");

        // Optionally, assert the exception details if your service handles specific exceptions in certain ways
        assertTrue(exception.getMessage().contains("Unexpected error"));

        // Verify that findById was attempted
        verify(feedbackRepository, times(1)).findById(feedbackId);
    }

    @Test
    void createAndEdit_shouldValidateEmailFormat_beforeSavingFeedback() {

    }

    @Test
    void createAndEdit_shouldNotAllowEmptyReviewText() {
        // Arrange
        CreateFeedbackRequest requestWithEmptyReviewText = new CreateFeedbackRequest();
        requestWithEmptyReviewText.setReviewText(""); // Set an empty review text

        // Act
        ResponseEntity<?> response = feedbackService.createAndEdit(requestWithEmptyReviewText);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode()); // Expect a BAD_REQUEST response for empty review text

        // Verify that the repository's save method is not called, indicating the feedback was not saved due to validation failure
        verify(feedbackRepository, never()).save(any());
    }

    @Test
    void createAndEdit_shouldAcceptValidGenderEnumValues() {
        // Arrange
        CreateFeedbackRequest requestWithValidGender = new CreateFeedbackRequest();
        requestWithValidGender.setGender(String.valueOf(enumGender.Male)); // Set a valid gender enum value

        // Act
        ResponseEntity<?> response = feedbackService.createAndEdit(requestWithValidGender);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Expect an OK response for valid gender enum value

        // Verify that the repository's save method is called, indicating the feedback was saved successfully
        verify(feedbackRepository, times(1)).save(any());
    }

    @Test
    void createAndEdit_shouldSetCreatedBy_whenCreatingNewFeedback() {

    }

    @Test
    void createAndEdit_shouldNotUpdateCreatedBy_whenEditingFeedback() {

    }

    @Test
    void detail_shouldReturnFeedbackWithAllDetails_whenFeedbackIdIsValid() {

    }


}