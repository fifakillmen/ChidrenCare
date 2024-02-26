package com.v1.ChildrenCare.service;

import jakarta.mail.Session;
import org.springframework.scheduling.annotation.Async;

import java.io.IOException;

public interface EmailService {
    void sendVerifyAccount( String toEmail, String code) throws IOException;
    void sendResetPassword( String toEmail, String link) throws IOException;
}
