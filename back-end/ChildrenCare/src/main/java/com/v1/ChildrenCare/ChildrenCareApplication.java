package com.v1.ChildrenCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync(proxyTargetClass = true)

public class ChildrenCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChildrenCareApplication.class, args);
	}

}
