import React, { useState, useEffect } from 'react';
import { startOfMonth, addDays, format, isSameMonth, isToday } from 'date-fns';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [userMode, setUserMode] = useState(false); // Default is admin mode

  const startDate = startOfMonth(currentMonth);
  const daysInMonth = Array.from({ length: 42 }, (_, index) =>
    addDays(startDate, index)
  );

  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});

  const handleOptionSelect = (day, option) => {
    // Check if the option is "Booked" or "Pending"
    if (option === 'booked' || option === 'pending') {
      // If the checkbox is checked, allow selecting the option
      if (userMode) {
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          [day]: option,
        }));
  
        // Close the dropdown menu for the selected date
        setDropdownOpen((prevDropdownState) => ({
          ...prevDropdownState,
          [day]: false,
        }));
  
        console.log(`${format(day, 'yyyy-MM-dd')}: ${option}`);
      }
    } else {
      // For date options, always allow selection
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [day]: option,
      }));
  
      // Close the dropdown menu for the selected date
      setDropdownOpen((prevDropdownState) => ({
        ...prevDropdownState,
        [day]: false,
      }));
  
      console.log(`${format(day, 'yyyy-MM-dd')}: ${option}`);
    }
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
        <h4 style={{ color: "#c97f08" }}>{format(currentMonth, 'MMMM yyyy')}</h4>
        <button
          className="btn btn-md"
          style={{ backgroundColor: "#c97f08" }}
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
        >
          Next
        </button>
        <label>
          <input
            type="checkbox"
            checked={userMode}
            onChange={() => setUserMode(!userMode)}
          />
          User Mode
        </label>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`calendar-day ${isSameMonth(day, startDate) ? 'current-month' : 'other-month'} ${
              isToday(day) ? 'today' : ''
            }`}
          >
            <div className="dropdown">
              <button
                className="btn btn-sm btn-info dropdown-toggle"
                type="button"
                id={`dropdownMenuButton${format(day, 'd')}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor:
                    selectedOptions[day] === 'booked' ? 'red' :
                    selectedOptions[day] === 'pending' ? 'gray' : '',
                }}
                disabled={userMode && (selectedOptions[day] === 'booked' || selectedOptions[day] === 'pending')}
              >
                {selectedOptions[day] || format(day, 'd')}
              </button>
              <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${format(day, 'd')}`}>
                <li>
                  <button
                    className={`dropdown-item ${
                      (!userMode && (selectedOptions[day] === format(day, 'd') || selectedOptions[day] === undefined)) ? '' : ''
                    }`}
                    onClick={() => handleOptionSelect(day, format(day, 'd'))}
                    disabled={userMode && (selectedOptions[day] === 'booked' || selectedOptions[day] === 'pending')}
                  >
                    {format(day, 'd')}
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      (!userMode || (userMode && (selectedOptions[day] === 'booked' || selectedOptions[day] === 'pending')) ||
                      (selectedOptions[day] === 'booked' && !userMode)
                    ) ? 'active' : ''
                    }`}
                    onClick={() => handleOptionSelect(day, 'booked')}
                    disabled={userMode && selectedOptions[day] === 'pending'}
                  >
                    Booked
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      (!userMode || (userMode && (selectedOptions[day] === 'booked' || selectedOptions[day] === 'pending')) ||
                      (selectedOptions[day] === 'pending' && !userMode)
                    ) ? 'active' : ''
                    }`}
                    onClick={() => handleOptionSelect(day, 'pending')}
                    disabled={userMode && selectedOptions[day] === 'booked'}
                  >
                    Pending
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
