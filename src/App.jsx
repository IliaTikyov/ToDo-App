import Header from "./components/Header";
import AddingTasks from "./components/AddingTasks";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#ecedef] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center pt-6">
        <ThemeToggle className="" />
        <Header />
        <AddingTasks />
      </div>
    </div>
  );
}

export default App;
