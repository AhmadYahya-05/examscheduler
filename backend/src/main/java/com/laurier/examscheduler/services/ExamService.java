package com.laurier.examscheduler.services;

import com.laurier.examscheduler.models.Exam;
import com.laurier.examscheduler.repositories.ExamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@Service
public class ExamService implements CommandLineRunner {
    
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
    
    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (examRepository.count() == 0) {
            initializeExamData();
        }
    }
    
    private void initializeExamData() {
        try {
            ClassPathResource resource = new ClassPathResource("exams.csv");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            
            String line;
            boolean firstLine = true;
            long id = 1;
            
            while ((line = reader.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue; // Skip header
                }
                
                // Parse CSV with proper handling of quoted fields
                String[] parts = parseCSVLine(line);
                if (parts.length >= 5) {
                    Exam exam = new Exam();
                    exam.setId(id++);
                    exam.setCourseCode(parts[0].trim());
                    exam.setSection(parts[1].trim());
                    exam.setDate(parts[2].trim());
                    exam.setTime(parts[3].trim());
                    exam.setLocation(parts[4].trim());
                    
                    examRepository.save(exam);
                }
            }
            
            reader.close();
            System.out.println("Exam data initialized successfully!");
            
        } catch (Exception e) {
            System.err.println("Error initializing exam data: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private String[] parseCSVLine(String line) {
        java.util.List<String> result = new java.util.ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                result.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        result.add(current.toString());
        return result.toArray(new String[0]);
    }
}
