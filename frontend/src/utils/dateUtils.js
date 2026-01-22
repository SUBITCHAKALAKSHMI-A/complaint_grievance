/**
 * Date and time utilities
 */

/**
 * Format date for display
 * @param {Date|string} date 
 * @param {string} format 
 * @returns {string}
 */
export const formatDate = (date, format = 'DD MMM YYYY, hh:mm A') => {
  const d = new Date(date);
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('default', { month: 'short' });
  const year = d.getFullYear();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
  
  // Format hours for 12-hour clock
  const displayHours = d.getHours() % 12 || 12;
  const formattedHours = displayHours.toString().padStart(2, '0');
  
  return format
    .replace('DD', day)
    .replace('MMM', month)
    .replace('YYYY', year)
    .replace('hh', formattedHours)
    .replace('mm', minutes)
    .replace('A', ampm);
};

/**
 * Calculate days difference between dates
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {number}
 */
export const daysDifference = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Check if date is within timeframe for escalation
 * @param {Date} submissionDate 
 * @param {string} priority 
 * @returns {boolean}
 */
export const shouldEscalate = (submissionDate, priority) => {
  const now = new Date();
  const daysPassed = daysDifference(submissionDate, now);
  
  const escalationTimeframes = {
    'Urgent': 1,
    'High': 3,
    'Medium': 7,
    'Low': 14
  };
  
  return daysPassed >= (escalationTimeframes[priority] || 7);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date} date 
 * @returns {string}
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  
  return formatDate(date, 'DD MMM YYYY');
};

/**
 * Generate time slots for test scheduling
 * @returns {Array}
 */
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      slots.push(time);
    }
  }
  return slots;
};

/**
 * Format duration in minutes to readable format
 * @param {number} minutes 
 * @returns {string}
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
};

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string}
 */
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Add days to a date
 * @param {Date} date 
 * @param {number} days 
 * @returns {Date}
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get week number of the year
 * @param {Date} date 
 * @returns {number}
 */
export const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
};

/**
 * Format date for API requests (ISO format)
 * @param {Date} date 
 * @returns {string}
 */
export const formatForAPI = (date) => {
  return new Date(date).toISOString();
};

/**
 * Parse date from string with multiple formats
 * @param {string} dateString 
 * @returns {Date}
 */
export const parseDate = (dateString) => {
  // Try ISO format first
  let date = new Date(dateString);
  
  // If invalid, try other formats
  if (isNaN(date.getTime())) {
    // Try MM/DD/YYYY
    const parts = dateString.split(/[/-]/);
    if (parts.length === 3) {
      date = new Date(parts[2], parts[1] - 1, parts[0]);
    }
  }
  
  return date;
};

/**
 * Check if a date is today
 * @param {Date} date 
 * @returns {boolean}
 */
export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is in the past
 * @param {Date} date 
 * @returns {boolean}
 */
export const isPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if a date is in the future
 * @param {Date} date 
 * @returns {boolean}
 */
export const isFuture = (date) => {
  return new Date(date) > new Date();
};

/**
 * Get month name from month number
 * @param {number} month 
 * @returns {string}
 */
export const getMonthName = (month) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

/**
 * Get short month name from month number
 * @param {number} month 
 * @returns {string}
 */
export const getShortMonthName = (month) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month];
};

/**
 * Get day name from day number
 * @param {number} day 
 * @returns {string}
 */
export const getDayName = (day) => {
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];
  return days[day];
};

/**
 * Get short day name from day number
 * @param {number} day 
 * @returns {string}
 */
export const getShortDayName = (day) => {
  const days = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];
  return days[day];
};