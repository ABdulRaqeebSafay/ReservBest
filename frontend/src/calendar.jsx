import  { useState } from 'react';
import { startOfMonth, addDays, format, isSameMonth, isToday } from 'date-fns';


const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startDate = startOfMonth(currentMonth);
  const daysInMonth = Array.from({ length: 42 }, (_, index) =>
    addDays(startDate, index)
  );

  return (
    <div className="calendar mt-5">
      <div className="calendar-header">
        <button className="btn btn-md  " style={{backgroundColor:"#c97f08"}} onClick={() => setCurrentMonth(addDays(currentMonth, -1 * 30))}>Previous</button>
        <h4 style={{color:"#c97f08"}}>{format(currentMonth, 'MMMM yyyy')}</h4>
        <button className="btn btn-md"  style={{backgroundColor:"#c97f08"}} onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>Next</button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`calendar-day ${isSameMonth(day, startDate) ? 'current-month' : 'other-month'} ${
              isToday(day) ? 'today' : ''
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
