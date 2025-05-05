import React from "react";
import { v4 as uuidv4 } from "uuid";
import { hobiesT } from "../types";
import { useHobbies } from "../context/HobbiesContext";

const FormAdd = () => {
  const { hobies, setHobbies } = useHobbies();
  const [name, setName] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Введіть назву хобі");
      setName("");
      return;
    }
    if (hobies.some((hobby: hobiesT) => hobby.name === name)) {
      setError("Хобі вже існує");
      setName("");
      return;
    }
    if (name.length < 2) {
      setError("Назва хобі повинна містити не менше 2 символів");
      setName("");
      return;
    }
    setHobbies([
      ...hobies,
      {
        id: uuidv4(),
        name,
        selected: [],
      },
    ]);
    setName("");
    setError("");
  };
  return (
    <div className="flex flex-wrap items-center max-w-md w-full p-4 border border-gray-300 rounded-md mb-3 shadow-md">
      <input
        type="text"
        name="name"
        placeholder="Назва хобі"
        className="border border-blue-500 p-2 grow"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 border border-blue-500 text-white p-2"
      >
        Додати хобі
      </button>
      {error && <p className="text-red-500 w-full">{error}</p>}
    </div>
  );
};

export { FormAdd };
