package com.v1.ChildrenCare.service;

import jakarta.mail.Session;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {
    void sendEmail(Session session, String toEmail, String subject, String body);
    void sendHTMLEmail(Session session, String toEmail, String subject, String htmlBody);
}
