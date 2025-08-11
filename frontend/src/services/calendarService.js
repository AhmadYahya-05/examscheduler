const calendarService = {
    // Generate an ICS file content for calendar apps
    generateICS: (exams) => {
      if (!exams || exams.length === 0) return null;
      
      // ICS file header
      let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Laurier Exam Scheduler//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
      ].join('\r\n');
      
      // Convert exam dates to proper format
      exams.forEach(exam => {
        // Parse exam date and time
        const [dayOfWeek, month, day] = exam.date.split(/,\s*|\s+/);
        const year = 2025; // Assuming exams are in 2025
        
        // Dynamic month parsing to support any semester (1-indexed for date string)
        const monthMap = {
          'January': 1, 'Jan.': 1, 'Jan': 1,
          'February': 2, 'Feb.': 2, 'Feb': 2,
          'March': 3, 'Mar.': 3, 'Mar': 3,
          'April': 4, 'Apr.': 4, 'Apr': 4,
          'May': 5,
          'June': 6, 'Jun.': 6, 'Jun': 6,
          'July': 7, 'Jul.': 7, 'Jul': 7,
          'August': 8, 'Aug.': 8, 'Aug': 8,
          'September': 9, 'Sep.': 9, 'Sep': 9,
          'October': 10, 'Oct.': 10, 'Oct': 10,
          'November': 11, 'Nov.': 11, 'Nov': 11,
          'December': 12, 'Dec.': 12, 'Dec': 12
        };
        
        const monthNum = monthMap[month] ?? 4; // Default to April if month not found
        
        // Parse time
        const [startTime, endTime] = exam.time.split(' - ');
        const [startHour, startMinute] = startTime.split(':');
        let startHourInt = parseInt(startHour);
        if (startTime.includes('PM') && startHourInt < 12) {
          startHourInt += 12;
        }
        
        // Default exam duration is 3 hours if end time not provided
        let endHourInt = startHourInt + 3;
        let endMinuteInt = parseInt(startMinute);
        if (endTime) {
          const [endHour, endMinute] = endTime.split(':');
          endHourInt = parseInt(endHour);
          endMinuteInt = parseInt(endMinute);
          if (endTime.includes('PM') && endHourInt < 12) {
            endHourInt += 12;
          }
        }
        
        // Format start date and time
        const startDate = new Date(year, monthNum - 1, parseInt(day), startHourInt, parseInt(startMinute));
        const endDate = new Date(year, monthNum - 1, parseInt(day), endHourInt, endMinuteInt);
        
        // Format dates for ICS
        const formatDateForICS = (date) => {
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        const startDateStr = formatDateForICS(startDate);
        const endDateStr = formatDateForICS(endDate);
        
        // Create event
        const event = [
          'BEGIN:VEVENT',
          `UID:${exam.id}@laurierexams.com`,
          `DTSTAMP:${formatDateForICS(new Date())}`,
          `DTSTART:${startDateStr}`,
          `DTEND:${endDateStr}`,
          `SUMMARY:${exam.courseCode} ${exam.section} Exam`,
          `DESCRIPTION:Final exam for ${exam.courseCode} ${exam.section}`,
          `LOCATION:${exam.location}`,
          'END:VEVENT'
        ].join('\r\n');
        
        icsContent += '\r\n' + event;
      });
      
      // Close calendar
      icsContent += '\r\n' + 'END:VCALENDAR';
      
      return icsContent;
    },
    
    // Download ICS file
    downloadICS: (exams) => {
      if (!exams || exams.length === 0) return;
      
      const icsContent = calendarService.generateICS(exams);
      if (!icsContent) return;
      
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'laurier-exam-schedule.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  export default calendarService;