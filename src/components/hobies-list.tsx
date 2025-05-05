import { useHobbies } from "../context/HobbiesContext";
import { HobiesItem } from "./hobies-item";

const HobiesList = () => {
  const { hobies } = useHobbies();

  return (
    <div className="flex flex-col gap-4  max-w-md border border-gray-300 rounded-md mb-3 shadow-md p-4 w-full">
      {hobies.length === 0 && (
        <h2 className="text-xl text-gray-400 font-bold text-center">
          Ще немає звичок...
        </h2>
      )}
      {hobies.map((hobby) => (
        <HobiesItem key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
};

export { HobiesList };
