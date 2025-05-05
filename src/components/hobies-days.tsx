import React from "react";

import { hobiesT, DaysT } from "../types";
import { useHobbies } from "../context/HobbiesContext";
import { HobiesDay } from "./hobies-day";

interface HobiesDaysProps {
  hobby: hobiesT;
}

export const HobiesDays: React.FC<HobiesDaysProps> = ({ hobby }) => {
  const { days } = useHobbies();
  return (
    <div className="flex gap-2">
      {days.map((day: DaysT) => {
        const isSelected = hobby.selected.includes(day.date);
        return (
          <HobiesDay
            day={day}
            id={hobby.id}
            isSelected={isSelected}
            key={day.id}
          />
        );
      })}
    </div>
  );
};
