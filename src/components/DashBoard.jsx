import React from "react";
import ThemeToggle from "./ThemeToggle";
import Menu from "./Menu";
import Header from "./Header";
import AddingTasks from "./AddingTasks";

const DashBoard = () => {
  return (
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
  );
};

export default DashBoard;
