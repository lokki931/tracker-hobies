import React from "react";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import { useHobbies } from "../context/HobbiesContext";
import { hobiesT } from "../types";
import { HobiesDays } from "./hobies-days";
import { Calendar } from "./hobies-calendar";
import { HobiesProgress } from "./hobies-progress";

interface HobiesItemProps {
  hobby: hobiesT;
}

const HobiesItem: React.FC<HobiesItemProps> = ({ hobby }) => {
  const { hobies, setHobbies } = useHobbies();
  const [showCalendar, setShowCalendar] = React.useState(false);
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDelete = (id: string) => {
    const updatedHobbies = hobies.filter((h) => h.id !== id);
    setHobbies(updatedHobbies);
  };
  return (
    <div
      key={hobby.id}
      className="flex flex-col gap-2 rounded-md shadow-md p-4 bg-white border border-gray-300 mb-3"
    >
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-bold">{hobby.name} </h2>
        <FaCalendarAlt
          className={`${
            showCalendar
              ? "text-green-500 hover:text-green-400"
              : "text-blue-500 hover:text-blue-400"
          } ml-auto cursor-pointer`}
          onClick={toggleCalendar}
        />
        <FaTrashAlt
          className="text-red-500 hover:text-red-400 ml-2 cursor-pointer"
          onClick={() => handleDelete(hobby.id)}
        />
      </div>
      <HobiesDays hobby={hobby} />
      <HobiesProgress id={hobby.id} />
      {showCalendar && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center">Календар хобі</h3>
          <Calendar markedDates={hobby.selected} />
        </div>
      )}
    </div>
  );
};

export { HobiesItem };
