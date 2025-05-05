import React from "react";
interface CalendarProps {
  markedDates: string[]; //  (format: "DD.MM.YYYY")
}

const formatDate = (dateObj: Date) => {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${d}.${m}.${y}`;
};

const Calendar: React.FC<CalendarProps> = ({ markedDates }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const blanks = (firstDay + 6) % 7;
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = blanks - 1; i >= 0; i--) {
      const day = prevMonthLastDate - i;
      const date = new Date(year, month - 1, day);
      const dateStr = formatDate(date);
      const isMarked = markedDates.includes(dateStr);

      cells.push(
        <div
          key={`prev-${day}`}
          className={`prev-month ${isMarked ? "marked" : ""}`}
        >
          {day}
        </div>
      );
    }
    for (let day = 1; day <= lastDate; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const dateStr = formatDate(new Date(year, month, day));
      const isMarked = markedDates.includes(dateStr);

      cells.push(
        <div
          key={`curr-${day}`}
          className={`${isToday ? "today" : ""} ${isMarked ? "marked" : ""}`}
        >
          {day}
        </div>
      );
    }
    const totalCells = blanks + lastDate;
    const extraCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= extraCells; i++) {
      const date = new Date(year, month + 1, i);
      const dateStr = formatDate(date);
      const isMarked = markedDates.includes(dateStr);

      cells.push(
        <div
          key={`next-${i}`}
          className={`other-month ${isMarked ? "marked" : ""}`}
        >
          {i}
        </div>
      );
    }

    return cells;
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          onClick={handlePrevMonth}
          className="text-2xl text-green-500 uppercase cursor-pointer"
        >
          ‹
        </button>
        <h2>
          {currentDate.toLocaleString("uk-UA", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-2xl text-green-500 uppercase cursor-pointer"
        >
          ›
        </button>
      </div>
      <div className="calendar-grid">{renderCalendarCells()}</div>
    </div>
  );
};

export { Calendar };
