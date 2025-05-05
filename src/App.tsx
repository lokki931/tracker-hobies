import { FormAdd } from "./components/form-add";
import { HobiesList } from "./components/hobies-list";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-2.5">Трекер Хобі</h1>
      <FormAdd />
      <HobiesList />
    </div>
  );
}

export default App;
