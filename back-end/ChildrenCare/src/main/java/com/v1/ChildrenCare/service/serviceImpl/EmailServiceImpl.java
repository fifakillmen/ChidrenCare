package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.configuration.FreeMarker.FreeMarkerConfiguration;
import com.v1.ChildrenCare.service.EmailService;
import freemarker.template.Template;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
    @Value("${HostMail}")
    private String HOST;
    @Value("${PortMail}")
    private String PORT;
    @Value("${UserNameMail}")
    private String USERNAME ;
    @Value("${PassWordMail}")
    private String PASSWORD ;
    private FreeMarkerConfiguration freeMarkerConfiguration;

    public EmailServiceImpl(FreeMarkerConfiguration freeMarkerConfiguration) {
        this.freeMarkerConfiguration = freeMarkerConfiguration;
    }
    public Properties configureMailProperties() {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.port", PORT);
        return props;

    }

    public  Session createMailSession(Properties properties) {
        return Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
    }
    @Async
    public void sendEmail(String toEmail, String subject, String body) {
        try {
            Properties properties= configureMailProperties();
            Session session = createMailSession(properties);
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
    public void sendHTMLEmail( String toEmail, String subject, String htmlBody) {
        try{
            Properties properties= configureMailProperties();
            Session session = createMailSession(properties);
            // Create a MIME message
            MimeMessage message = new MimeMessage(session);

            // Set sender address
            message.setFrom(new InternetAddress(USERNAME));

            // Set recipient
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));

            // Set subject
            message.setSubject(subject);

            // Set MIME type to HTML
            message.setContent(htmlBody, "text/html; charset=UTF-8");

            // Send message
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendVerifyAccount(String toEmail,String code )  {
        try {
            Template template =freeMarkerConfiguration
                    .freeMarkerConfig()
                    .getTemplate("email-verify.ftl");
            Map<String, Object> model = new HashMap<>();
            model.put("email", toEmail);
            model.put("maXacThuc", code);
            String content = FreeMarkerTemplateUtils
                    .processTemplateIntoString(template, model);
            sendHTMLEmail(toEmail,"Verification Account",content);
        }catch (Exception e){
            System.out.println("loi gui verify email");
        }


    }

    @Override
    public void sendResetPassword(String toEmail, String link)  {
        try {
            Template template =freeMarkerConfiguration
                    .freeMarkerConfig()
                    .getTemplate("email-resetpassword.ftl");
            Map<String, Object> model = new HashMap<>();
            model.put("email", toEmail);
            model.put("duongdan", link);
            String content = FreeMarkerTemplateUtils
                    .processTemplateIntoString(template, model);
            sendHTMLEmail(toEmail,"Reset password",content);
        }catch (Exception e){
            System.out.println("loi gui reset password email");
            System.out.println(e.getMessage());
        }
    }
}
