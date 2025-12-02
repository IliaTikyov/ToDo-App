import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import Menu from "../components/Menu";
import Header from "../components/Header";
import AddingTasks from "../components/AddingTasks";

const DashBoard = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Top bar actions */}
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>
      <div className="absolute top-3 left-2">
        <Menu />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-start pt-16 px-4 gap-6">
        <Header />
        <AddingTasks />
      </div>
    </div>
  );
};

export default DashBoard;
