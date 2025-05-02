package com.laurier.examscheduler.controllers;

import com.laurier.examscheduler.models.Exam;
import com.laurier.examscheduler.services.ExamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
//@CrossOrigin(origins = "*")  // For development - restrict this in production
public class ExamController {
    
    private final ExamService examService;
    
    public ExamController(ExamService examService) {
        this.examService = examService;
    }
    
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
    
    @GetMapping("/search")
    public List<Exam> searchExams(@RequestParam String courseCode) {
        return examService.getExamsByCourseCode(courseCode);
    }
}
// Removed HealthCheckController to place it in its own file