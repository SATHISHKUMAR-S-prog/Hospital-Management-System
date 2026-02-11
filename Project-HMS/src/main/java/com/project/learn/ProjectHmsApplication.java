package com.project.learn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ProjectHmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectHmsApplication.class, args);
	}

}
