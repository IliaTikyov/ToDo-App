import Header from "./components/Header";
import AddingTasks from "./components/AddingTasks";
import ThemeToggle from "./components/ThemeToggle";
import Menu from "./components/Menu";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className=" relative min-h-screen w-full bg-[#ecedef] dark:bg-gray-800">
          <div className="flex flex-col items-center justify-center pt-6">
            <div className="absolute top-3 right-3">
              <ThemeToggle />
            </div>
            <div className="absolute top-3 left-2">
              <Menu />
            </div>
            <Header />
            <AddingTasks />
          </div>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
