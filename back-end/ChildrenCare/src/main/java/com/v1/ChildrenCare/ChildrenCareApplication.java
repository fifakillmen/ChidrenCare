package com.v1.ChildrenCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync(proxyTargetClass = true)
@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration.class})
public class ChildrenCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChildrenCareApplication.class, args);
	}

}
