// src/components/ExamList.js
import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Divider, 
  Box, 
  Typography, 
  CircularProgress,
  Paper,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function ExamList({ exams, onAddExam, onRemoveExam, isSearchResult, loading }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (exams.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          bgcolor: 'background.default',
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {isSearchResult 
            ? 'Search for courses to see available exams' 
            : 'No exams added to your schedule yet'}
        </Typography>
      </Paper>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
      {exams.map((exam, index) => (
        <React.Fragment key={exam.id}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              isSearchResult ? (
                <IconButton 
                  edge="end" 
                  onClick={() => onAddExam(exam)}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    width: 36,
                    height: 36
                  }}
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton 
                  edge="end" 
                  onClick={() => onRemoveExam(exam.id)}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.dark',
                    },
                    width: 36,
                    height: 36
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
            sx={{ py: 2 }}
          >
            <ListItemText
              primaryTypographyProps={{ component: 'div' }}
              secondaryTypographyProps={{ component: 'div' }}
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    component="div" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.dark'
                    }}
                  >
                    {exam.courseCode}
                  </Typography>
                  <Chip 
                    label={exam.section} 
                    size="small"
                    sx={{ 
                      ml: 1,
                      bgcolor: 'primary.light',
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <CalendarTodayIcon 
                      fontSize="small" 
                      sx={{ mr: 1, color: 'primary.main', opacity: 0.8 }} 
                    />
                    <Typography variant="body2" color="text.primary">
                      {exam.date}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <AccessTimeIcon 
                      fontSize="small" 
                      sx={{ mr: 1, color: 'primary.main', opacity: 0.8 }} 
                    />
                    <Typography variant="body2" color="text.primary">
                      {exam.time}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon 
                      fontSize="small" 
                      sx={{ mr: 1, color: 'primary.main', opacity: 0.8 }} 
                    />
                    <Typography variant="body2" color="text.primary">
                      {exam.location}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
          {index < exams.length - 1 && (
            <Divider variant="inset" component="li" sx={{ ml: 0 }} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

export default ExamList;