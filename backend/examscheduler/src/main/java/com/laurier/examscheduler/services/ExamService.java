package com.laurier.examscheduler.services;

import com.laurier.examscheduler.models.Exam;
import com.laurier.examscheduler.repositories.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {
    
    private final ExamRepository examRepository;
    
    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }
    
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
    
    public List<Exam> getExamsByCourseCode(String courseCode) {
        return examRepository.findByCourseCodeContainingIgnoreCase(courseCode);
    }
}
