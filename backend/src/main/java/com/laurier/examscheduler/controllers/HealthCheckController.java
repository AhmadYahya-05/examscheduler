package com.laurier.examscheduler.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/")
    public String home() {
        return "Laurier Exam Scheduler Backend is running!";
    }

    @GetMapping("/api/health")
    public String healthCheck() {
        return "Healthy!";
    }
}
