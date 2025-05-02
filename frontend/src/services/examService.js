// src/services/examService.js
import axios from 'axios';

const API_BASE_URL = 'https://examscheduler-production.up.railway.app/api/exams'; // Adjust the base URL as needed

const examService = {
  // Get all exams
  getAllExams: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching exams:', error);
      throw error;
    }
  },

  // Search exams by course code
  searchExams: async (courseCode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { courseCode }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching for course ${courseCode}:`, error);
      throw error;
    }
  }
};

export default examService;