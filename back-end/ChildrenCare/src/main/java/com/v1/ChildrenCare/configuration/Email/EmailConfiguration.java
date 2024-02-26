package com.v1.ChildrenCare.configuration.Email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;
@Configuration
public class EmailConfiguration {
    @Value("HostMail")
    static String HOST;
    @Value("PortMail")
    static String PORT;

    @Bean
    public static Properties configureMailProperties() {

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.port", PORT);

        return props;

    }

}

