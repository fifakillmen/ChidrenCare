package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.service.EmailService;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
    @Value("UserNameMail")
    static String USERNAME ;
    @Value("PassWordMail")
    static String PASSWORD ;
    private final Properties mailProperties;

    public EmailServiceImpl(Properties mailProperties) {
        this.mailProperties = mailProperties;
    }

    public static Session createMailSession(Properties properties) {
        return Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
    }
    @Async
    @Override
    public void sendEmail(Session session, String toEmail, String subject, String body) {
        try {
            // Tạo một đối tượng MimeMessage
            Message message = new MimeMessage(session);

            // Đặt thông tin người gửi
            message.setFrom(new InternetAddress(USERNAME));

            // Đặt thông tin người nhận
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));

            // Đặt tiêu đề
            message.setSubject(subject);

            // Đặt nội dung email
            message.setText(body);

            // Gửi email
            Transport.send(message);

            System.out.println("Email sent successfully.");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Async
    @Override
    public void sendHTMLEmail(Session session, String toEmail, String subject, String htmlBody) {
        try{
            // Create a MIME message
            MimeMessage message = new MimeMessage(session);

            // Set sender address
            message.setFrom(new InternetAddress(USERNAME));

            // Set recipient
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));

            // Set subject
            message.setSubject(subject);

            // Set MIME type to HTML
            message.setContent(htmlBody, "text/html");

            // Send message
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
