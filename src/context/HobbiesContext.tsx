import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { hobiesT, DaysT } from "../types";

interface HobbiesContextType {
  hobies: hobiesT[];
  setHobbies: React.Dispatch<React.SetStateAction<hobiesT[]>>;
  days: DaysT[];
}

const HobbiesContext = createContext<HobbiesContextType | undefined>(undefined);

export const HobbiesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hobies, setHobbies] = useState<hobiesT[]>([]);
  const date = new Date();
  const days = [] as DaysT[];
  for (let i = 0; i < 5; i++) {
    const id = uuidv4();
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - i
    );

    const weekDay = newDate.toLocaleDateString("uk-UA", {
      weekday: "short",
    });

    const newDay = newDate.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    days.push({ id, week: weekDay, date: newDay, active: false });
  }
  useEffect(() => {
    const storedHobbies = localStorage.getItem("hobbies");
    if (storedHobbies) {
      setHobbies(JSON.parse(storedHobbies));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("hobbies", JSON.stringify(hobies));
  }, [hobies]);

  return (
    <HobbiesContext.Provider value={{ hobies, setHobbies, days }}>
      {children}
    </HobbiesContext.Provider>
  );
};

export const useHobbies = () => {
  const context = useContext(HobbiesContext);
  if (!context) {
    throw new Error("useHobbies must be used within a HobbiesProvider");
  }
  return context;
};
