// src/components/ExamCalendar.js
import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Paper, Typography, Grid, Chip, Divider, useTheme, Button, ButtonGroup } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import calendarService from '../services/calendarService';


function ExamCalendar({ exams }) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [weekGroups, setWeekGroups] = useState([]);
  const theme = useTheme();
  const calendarRef = React.useRef(null);
  
  // Function to parse date string (e.g., "Saturday, April 12" or "Friday, Aug. 08")
  const parseExamDate = (dateStr) => {
    const [dayOfWeek, month, day] = dateStr.split(/,\s*|\s+/);
    const year = 2025;
    
    // Dynamic month parsing to support any semester
    const monthMap = {
      'January': 0, 'Jan.': 0, 'Jan': 0,
      'February': 1, 'Feb.': 1, 'Feb': 1,
      'March': 2, 'Mar.': 2, 'Mar': 2,
      'April': 3, 'Apr.': 3, 'Apr': 3,
      'May': 4,
      'June': 5, 'Jun.': 5, 'Jun': 5,
      'July': 6, 'Jul.': 6, 'Jul': 6,
      'August': 7, 'Aug.': 7, 'Aug': 7,
      'September': 8, 'Sep.': 8, 'Sep': 8,
      'October': 9, 'Oct.': 9, 'Oct': 9,
      'November': 10, 'Nov.': 10, 'Nov': 10,
      'December': 11, 'Dec.': 11, 'Dec': 11
    };
    
    const monthNum = monthMap[month] ?? 3; // Default to April if month not found
    return new Date(year, monthNum, parseInt(day));
  };
  
  // Function to create a date range for the exam period
  const getExamPeriodDates = () => {
    if (exams.length === 0) return [];
    
    // Find earliest and latest exam dates
    const dates = exams.map(exam => parseExamDate(exam.date));
    const firstDate = new Date(Math.min(...dates));
    const lastDate = new Date(Math.max(...dates));
    
    // Add padding days before and after
    firstDate.setDate(firstDate.getDate() - 2);
    lastDate.setDate(lastDate.getDate() + 2);
    
    // Generate all days in the range
    const daysArray = [];
    const currentDate = new Date(firstDate);
    
    while (currentDate <= lastDate) {
      daysArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return daysArray;
  };

  const handleDownloadICS = () => {
    calendarService.downloadICS(exams);
  };
  
  // Group days into weeks
  const groupDaysIntoWeeks = (days) => {
    const weeks = [];
    let currentWeek = [];
    
    days.forEach((day, index) => {
      if (index === 0 || day.getDay() === 0) { // Start new week on Sunday
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }
        currentWeek = [day];
      } else {
        currentWeek.push(day);
      }
    });
    
    // Add the last week
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  };
  
  // Find exams for a specific date
  const getExamsForDate = (date) => {
    // Compare using the actual Date objects instead of string comparison
    return exams.filter(exam => {
      const examDate = parseExamDate(exam.date);
      
      // Compare year, month, and day
      return examDate.getFullYear() === date.getFullYear() &&
             examDate.getMonth() === date.getMonth() &&
             examDate.getDate() === date.getDate();
    });
  };
  
  useEffect(() => {
    const days = getExamPeriodDates();
    setCalendarDays(days);
    setWeekGroups(groupDaysIntoWeeks(days));
  }, [exams]);
  
  if (exams.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="text.secondary">
          Add exams to see your visual calendar
        </Typography>
      </Box>
    );
  }
  
  // Function to format date as weekday and day
  const formatDayHeader = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    return { dayName, dayNum };
  };
  
  // Function to get background color based on exam count
  const getDayBackground = (dayExams) => {
    if (dayExams.length === 0) return 'white';
    
    // Different shades based on number of exams
    if (dayExams.length === 1) return 'rgba(69, 39, 160, 0.08)';
    if (dayExams.length === 2) return 'rgba(69, 39, 160, 0.15)';
    return 'rgba(69, 39, 160, 0.25)';
  };

  const handleDownloadPDF = async () => {
    if (exams.length === 0) return;
    
    const calendarElement = calendarRef.current;
    const canvas = await html2canvas(calendarElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Calculate the PDF dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Add a header to the PDF
    pdf.setFillColor(94, 45, 145); // Laurier purple
    pdf.rect(0, 0, pdfWidth, 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text('Wilfrid Laurier University - Exam Schedule', pdfWidth/2, 12, { align: 'center' });
    
    // Add the image below the header
    pdf.addImage(imgData, 'PNG', 0, 25, pdfWidth, pdfHeight);
    
    // Add course list at the bottom
    pdf.setTextColor(94, 45, 145);
    pdf.setFontSize(12);
    const yPosition = 25 + pdfHeight + 10;
    pdf.text('Enrolled Courses:', 10, yPosition);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    exams.forEach((exam, index) => {
      pdf.text(`${index + 1}. ${exam.courseCode} ${exam.section} - ${exam.date}, ${exam.time} - ${exam.location}`, 
        15, yPosition + 7 + (index * 5));
    });
    
    // Add footer with date
    const today = new Date().toLocaleDateString();
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on ${today} - For reference only`, pdfWidth/2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    
    // Save the PDF
    pdf.save('exam-schedule.pdf');
  };
  
  if (exams.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="text.secondary">
          Add exams to see your visual calendar
        </Typography>
      </Box>
    );
  }
  
  
  return (
    <Box sx={{ mt: 2 }}>
      {/* Download buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ButtonGroup variant="contained">
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{ 
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}40`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
              }
            }}
          >
            PDF Schedule
          </Button>
          <Button
            startIcon={<EventIcon />}
            onClick={handleDownloadICS}
            sx={{ 
              background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
              boxShadow: `0 3px 5px 2px ${theme.palette.secondary.main}40`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
              }
            }}
          >
            Calendar (.ics)
          </Button>
        </ButtonGroup>
      </Box>
      
      {/* Apply the ref to this div that wraps all calendar content */}
      <div ref={calendarRef}>
        {weekGroups.map((week, weekIndex) => (
          <Paper 
            key={`week-${weekIndex}`} 
            elevation={1}
            sx={{ 
              mb: 3,
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            <Box 
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                py: 1,
                px: 2
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Week {weekIndex + 1}
              </Typography>
            </Box>
            
            <Grid container>
              {week.map((day, dayIndex) => {
                const dayExams = getExamsForDate(day);
                const hasExams = dayExams.length > 0;
                const { dayName, dayNum } = formatDayHeader(day);
                const isWeekend = [0, 6].includes(day.getDay()); // 0 is Sunday, 6 is Saturday
                
                return (
                  <Grid item xs={12} sm={6} md={4} lg={hasExams ? 4 : 2} key={dayIndex}
                    sx={{ 
                      borderRight: '1px solid',
                      borderBottom: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.12)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: hasExams ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                        zIndex: 1,
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 2,
                        height: '100%',
                        bgcolor: hasExams ? getDayBackground(dayExams) : (isWeekend ? 'rgba(0, 0, 0, 0.03)' : 'white'),
                        borderLeft: hasExams ? `4px solid ${theme.palette.primary.main}` : 'none',
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mb: 1
                      }}>
                        <Typography 
                          variant="subtitle2" 
                          fontWeight={hasExams ? 'bold' : 'normal'}
                          color={hasExams ? 'primary.dark' : (isWeekend ? 'text.secondary' : 'text.primary')}
                        >
                          {dayName}
                        </Typography>
                        
                        <Typography 
                          variant="h6" 
                          fontWeight={hasExams ? 'bold' : 'normal'}
                          color={hasExams ? 'primary.dark' : (isWeekend ? 'text.secondary' : 'text.primary')}
                        >
                          {dayNum}
                        </Typography>
                      </Box>
                      
                      {hasExams && (
                        <Box sx={{ mt: 1 }}>
                          {dayExams.length > 0 && (
                            <Chip 
                              label={`${dayExams.length} Exam${dayExams.length > 1 ? 's' : ''}`}
                              size="small"
                              sx={{ 
                                mb: 1,
                                bgcolor: 'secondary.main',
                                color: 'secondary.contrastText',
                                fontWeight: 'bold'
                              }}
                            />
                          )}
                          
                          {dayExams.map((exam, i) => (
                            <Box 
                              key={exam.id} 
                              sx={{ 
                                mt: i > 0 ? 2 : 0,
                                p: 1.5,
                                bgcolor: 'white',
                                border: '1px solid',
                                borderColor: 'primary.light',
                                borderRadius: 1,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                              }}
                            >
                              <Typography 
                                variant="subtitle2" 
                                fontWeight="bold"
                                color="primary.dark"
                                sx={{ mb: 1 }}
                              >
                                {exam.courseCode} {exam.section}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <AccessTimeIcon 
                                  fontSize="small" 
                                  sx={{ mr: 0.5, color: 'primary.main', fontSize: '0.8rem' }} 
                                />
                                <Typography variant="caption">
                                  {exam.time}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon 
                                  fontSize="small" 
                                  sx={{ mr: 0.5, color: 'primary.main', fontSize: '0.8rem' }} 
                                />
                                <Typography variant="caption">
                                  {exam.location}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}
                      
                      {!hasExams && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          align="center" 
                          sx={{ mt: 2, fontSize: '0.75rem' }}
                        >
                          No exams
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        ))}
      </div>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Note: Remote exams may have different procedures. Check your course website for details.
        </Typography>
      </Box>
    </Box>
  );
}
export default ExamCalendar;