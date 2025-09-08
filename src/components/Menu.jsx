import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="grid place-content-center p-2 cursor-pointer z-50 relative"
      >
        {isOpen ? (
          <LuX className="w-8 h-8 text-gray-500 hover:bg-gray-800" />
        ) : (
          <LuMenu className="w-8 h-8 text-gray-500 hover:bg-gray-700" />
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white  dark:bg-gray-900 dark:text-white flex flex-col items-start p-6 text-lg">
          <div className="flex flex-col items-start space-y-5 mt-20">
            <Link to="/settings" className="hover:underline">
              Settings
            </Link>
            <Link to="/settings" className="hover:underline">
              Completed Tasks
            </Link>
            <Link to="/settings" className="hover:underline">
              Archives
            </Link>
            <Link to="/settings" className="hover:underline">
              Account
            </Link>
          </div>
          <button className="fixed bottom-8 left-15 bg-red-400 px-8 py-2 rounded-full text-white shadow-lg hover:bg-red-500">
            <Link to="/login"> Sign Out </Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Menu;
