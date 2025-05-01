package com.laurier.examscheduler.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/")
    public String index() {
        return "✅ Laurier Exam Scheduler Backend is Running!";
    }
}
