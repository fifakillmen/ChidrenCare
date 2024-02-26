package com.v1.ChildrenCare.configuration.FreeMarker;

import com.v1.ChildrenCare.service.EmailService;
import freemarker.template.Configuration;

@org.springframework.context.annotation.Configuration
public class FreeMarkerConfiguration {
    public Configuration freeMarkerConfig() {
        Configuration config = new Configuration();
        config.setClassForTemplateLoading(EmailService.class, "/templates");
        return config;
    }

}
