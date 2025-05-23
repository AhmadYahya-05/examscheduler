package com.laurier.examscheduler.repositories;

import com.laurier.examscheduler.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCourseCodeContainingIgnoreCase(String courseCode);
}