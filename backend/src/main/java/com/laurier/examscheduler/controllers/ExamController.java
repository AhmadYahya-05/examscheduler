package com.laurier.examscheduler.controllers;

import com.laurier.examscheduler.models.Exam;
import com.laurier.examscheduler.services.ExamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    
    private final ExamService examService;
    
    public ExamController(ExamService examService) {
        this.examService = examService;
    }
    
    @GetMapping
    public List<Exam> getAllExams() {
        try {
            List<Exam> exams = examService.getAllExams();
            System.out.println("Retrieved " + exams.size() + " exams");
            return exams;
        } catch (Exception e) {
            System.err.println("Error retrieving all exams: " + e.getMessage());
            throw e;
        }
    }
    
    @GetMapping("/search")
    public List<Exam> searchExams(@RequestParam String courseCode) {
        try {
            List<Exam> exams = examService.getExamsByCourseCode(courseCode);
            System.out.println("Search for '" + courseCode + "' returned " + exams.size() + " results");
            return exams;
        } catch (Exception e) {
            System.err.println("Error searching exams for course code '" + courseCode + "': " + e.getMessage());
            throw e;
        }
    }
}
// Removed HealthCheckController to place it in its own file