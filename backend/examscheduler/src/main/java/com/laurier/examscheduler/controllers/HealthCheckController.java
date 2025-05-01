package com.laurier.examscheduler.controllers;

import org.springframework.web.bind.annotation.GetMapping;

public class HealthCheckController {
    @GetMapping("/")
    public String root() {
        return "Laurier Exam Scheduler API is running and working!";
    }
    
}
