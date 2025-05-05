import React from "react";
import { useHobbies } from "../context/HobbiesContext";
import { DaysT } from "../types";
interface HobiesDayProps {
  day: DaysT;
  id: string;
  isSelected: boolean;
}
export const HobiesDay: React.FC<HobiesDayProps> = ({
  day,
  id,
  isSelected,
}) => {
  const { hobies, setHobbies } = useHobbies();
  const handleSelect = () => {
    const updatedHobbies = hobies.map((hobby) => {
      if (hobby.id === id) {
        const selectedDays = hobby.selected.includes(day.date)
          ? hobby.selected.filter((d) => d !== day.date)
          : [...hobby.selected, day.date];
        return { ...hobby, selected: selectedDays };
      }
      return hobby;
    });
    setHobbies(updatedHobbies);
  };
  return (
    <div
      onClick={handleSelect}
      className={`uppercase w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
        isSelected ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      {day.week}
    </div>
  );
};
