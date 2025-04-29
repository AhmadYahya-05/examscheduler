package com.laurier.examscheduler;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ExamschedulerApplication {

	public static void main(String[] args) {

		Dotenv.configure().load();
		SpringApplication.run(ExamschedulerApplication.class, args);
	}

}
