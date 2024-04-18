package com.ssafy.challs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ChallsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChallsApplication.class, args);
	}

}
