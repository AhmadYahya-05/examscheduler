// src/components/ExamScheduler.js
import React, { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, Paper, 
  Tabs, Tab, Divider, useTheme, useMediaQuery, Grid, Chip, ButtonGroup 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExamList from './ExamList';
import ExamCalendar from './ExamCalender';
import examService from '../services/examService';
import calendarService from '../services/calendarService';


// Laurier colors
const laurierPurple = '#5E2D91';  // Primary purple
const laurierGold = '#FFB81C';    // Primary gold
const lightPurple = '#8F6BB2';
const darkPurple = '#4A2272';
const lightGold = '#FFD866';

function ExamScheduler() {
  const [courseCode, setCourseCode] = useState('');
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = async () => {
    if (!courseCode.trim()) {
      setError('Please enter a course code');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const results = await examService.searchExams(courseCode);
      setExams(results);
      if (results.length === 0) {
        setError(`No exams found for course ${courseCode}`);
      }
    } catch (error) {
      setError('Failed to fetch exam data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const handleAddExam = (exam) => {
    // Check if exam is already selected
    if (!selectedExams.find(selected => selected.id === exam.id)) {
      setSelectedExams([...selectedExams, exam]);
      
      // Auto-switch to calendar view when first exam is added
      if (selectedExams.length === 0 && isMobile) {
        setTabValue(1);
      }
    }
  };

  const handleRemoveExam = (examId) => {
    setSelectedExams(selectedExams.filter(exam => exam.id !== examId));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (

    
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        background: `linear-gradient(to right, ${laurierPurple}15, ${laurierGold}15)`,
        borderRadius: 3,
        p: 3,
        mb: 4,
        borderLeft: `6px solid ${laurierPurple}`,
        borderRight: `6px solid ${laurierGold}`,
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: darkPurple,
            fontWeight: 'bold',
            mb: 3,
            
            
          }}
        >
          Find Your Exams
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            label="Enter Course Code (e.g., CP104)"
            variant="outlined"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ 
              mr: 2,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: laurierPurple,
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: laurierPurple,
              }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={loading}
            startIcon={<SearchIcon />}
            sx={{ 
              px: 3,
              background: `linear-gradient(45deg, ${laurierPurple} 30%, ${lightPurple} 90%)`,
              boxShadow: `0 3px 5px 2px ${laurierPurple}40`,
              '&:hover': {
                background: `linear-gradient(45deg, ${darkPurple} 30%, ${laurierPurple} 90%)`,
              }
            }}
          >
            Search
          </Button>
        </Box>
        
        {error && (
          <Typography color="error" sx={{ mb: 2, fontWeight: 500 }}>
            {error}
          </Typography>
        )}
      </Box>
      
      {/* Mobile view with tabs */}
      {isMobile && (
        <Box sx={{ mb: 2 }}>
          <Paper sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderTop: `4px solid ${laurierGold}`,
          }}>
            <Tabs 
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                mb: 1,
                '& .MuiTabs-indicator': {
                  backgroundColor: laurierGold,
                  height: 3,
                },
                '& .MuiTab-root': {
                  color: darkPurple,
                  '&.Mui-selected': {
                    color: laurierPurple,
                    fontWeight: 'bold',
                  }
                }
              }}
            >
              <Tab icon={<SearchIcon />} label="Search Results" />
              <Tab 
                icon={<CalendarMonthIcon />} 
                label={`My Schedule (${selectedExams.length})`} 
              />
            </Tabs>
            
            {tabValue === 0 && (
              <Box sx={{ p: 2 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: laurierPurple, 
                    borderBottom: `2px solid ${lightGold}`,
                    pb: 1,
                    fontWeight: 'bold'
                  }}
                >
                  Search Results
                </Typography>
                <ExamList 
                  exams={exams} 
                  onAddExam={handleAddExam} 
                  isSearchResult={true}
                  loading={loading} 
                />
              </Box>
            )}
            
            {tabValue === 1 && (
              <>
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      color: laurierPurple, 
                      borderBottom: `2px solid ${lightGold}`,
                      pb: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    Your Exam Schedule
                  </Typography>
                  <ExamList 
                    exams={selectedExams} 
                    onRemoveExam={handleRemoveExam} 
                    isSearchResult={false}
                  />
                </Box>
                
                {selectedExams.length > 0 && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 2, borderColor: `${laurierPurple}20` }} />
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        color: laurierPurple, 
                        borderBottom: `2px solid ${lightGold}`,
                        pb: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <CalendarMonthIcon sx={{ mr: 1, color: laurierGold }} />
                      Visual Schedule
                    </Typography>
                    <ExamCalendar exams={selectedExams} />
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Box>
      )}
      
      {/* Desktop view side by side */}
      {!isMobile && (
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Paper sx={{ 
            flex: 1, 
            p: 3, 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderTop: `4px solid ${laurierGold}`,
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: laurierPurple, 
                borderBottom: `2px solid ${lightGold}`,
                pb: 1,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SearchIcon sx={{ mr: 1, color: laurierGold }} />
              Search Results
            </Typography>
            <ExamList 
              exams={exams} 
              onAddExam={handleAddExam} 
              isSearchResult={true}
              loading={loading} 
            />
          </Paper>
          
          <Paper sx={{ 
            flex: 1, 
            p: 3, 
            borderRadius: 2, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderTop: `4px solid ${laurierGold}`,
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: laurierPurple, 
                borderBottom: `2px solid ${lightGold}`,
                pb: 1,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ListAltIcon sx={{ mr: 1, color: laurierGold }} />
              Your Exam Schedule
            </Typography>
            <ExamList 
              exams={selectedExams} 
              onRemoveExam={handleRemoveExam} 
              isSearchResult={false}
            />
          </Paper>
        </Box>
      )}
      
      {/* Calendar view (always visible on desktop, conditionally on mobile) */}
      {(!isMobile && selectedExams.length > 0) && (
        <Paper sx={{ 
          mt: 3, 
          p: 3, 
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderTop: `4px solid ${laurierGold}`,
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: laurierPurple, 
              borderBottom: `2px solid ${lightGold}`,
              pb: 1,
              mb: 2,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <CalendarMonthIcon sx={{ mr: 1, color: laurierGold }} />
            Visual Schedule
          </Typography>
          <ExamCalendar exams={selectedExams} />
        </Paper>
      )}
    </Container>
  );
}

export default ExamScheduler;