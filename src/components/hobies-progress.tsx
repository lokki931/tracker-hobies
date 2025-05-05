import React from "react";
import { useHobbies } from "../context/HobbiesContext";

interface HobiesProgressProps {
  id: string;
}
export const HobiesProgress: React.FC<HobiesProgressProps> = ({ id }) => {
  const { hobies, days } = useHobbies();
  const totalDays = days.length;
  const selectedDays = hobies.find((h) => h.id === id)?.selected || [];
  const selectedDaysObj = days.filter((day) => selectedDays.includes(day.date));
  const selectedDaysCount = selectedDaysObj.length;
  const progress = Math.round((selectedDaysCount / totalDays) * 100);
  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="bg-green-500 h-6 rounded-full transition-all duration-300 text-center text-gray-100"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {selectedDaysCount} з {totalDays} днів виконано
      </p>
    </div>
  );
};
