package com.laurier.examscheduler.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "exams")
public class Exam {
    @Id
    private Long id;
    
    @Column(name = "coursecode") // Add this to match your database column name exactly
    private String courseCode;
    
    private String section;
    private String date;
    private String time;
    private String location;
    
    // getters and setters
}