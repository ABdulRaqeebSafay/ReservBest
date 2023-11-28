import React, { useState } from 'react';
import { startOfMonth, addDays, format, isSameMonth, isToday } from 'date-fns';
import { useSelectedDate } from './contexts/calendarContext';
import { useDayStatus } from './contexts/dayStatusContext';

const Calendar = () => {
  const today = new Date();
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { setDayStatus } = useDayStatus();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startDate = startOfMonth(currentMonth);
  const daysInMonth = Array.from({ length: 42 }, (_, index) =>
    addDays(startDate, index)
  );

  const handleOptionSelect = (day) => {
    setSelectedDate(format(day, 'yyyy-MM-dd'));
    setDayStatus('booked');
  };

  return (
    <div className="calendar mt-5">
      <div className="calendar-header">
        <button
          className="btn btn-md"
          style={{ backgroundColor: "#c97f08" }}
          onClick={() => setCurrentMonth(addDays(currentMonth, -1 * 30))}
        >
          Previous
        </button>
        <h5 style={{ color: "#c97f08" }}>{format(currentMonth, 'MMMM yyyy')}</h5>
        <button
          className="btn btn-md"
          style={{ backgroundColor: "#c97f08" }}
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
        >
          Next
        </button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              isSameMonth(day, startDate) ? 'current-month' : 'other-month'
            } ${isToday(day) ? 'today' : ''} ${
              selectedDate === format(day, 'yyyy-MM-dd') ? 'selected-date' : ''
            }`}
            onClick={() => handleOptionSelect(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
