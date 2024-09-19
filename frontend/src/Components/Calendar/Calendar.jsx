import React, { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import react-calendar styles
import "./calendar.css"; // Import your CSS file

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <p>Selected date: {date.toDateString()}</p>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
