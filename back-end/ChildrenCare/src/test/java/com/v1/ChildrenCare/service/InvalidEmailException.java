package com.v1.ChildrenCare.service;

public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException(String message) {
        super(message);
    }

    public InvalidEmailException(String message, Throwable cause) {
        super(message, cause);
    }
    public void validateEmail(String email) {
        // Example validation logic
        if (!email.contains("@")) {
            throw new InvalidEmailException("Invalid email format");
        }
    }

}
