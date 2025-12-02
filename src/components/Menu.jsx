import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("You were sign out");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav>
      {/* Menu toggle button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="grid place-content-center p-2 cursor-pointer z-50 relative"
      >
        {isOpen ? (
          <LuX className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" />
        ) : (
          <LuMenu className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" />
        )}
      </div>

      {isOpen && (
        <>
          {/* Clickable backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Side panel */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl z-40 flex flex-col justify-between p-6 text-lg">
            {/* Links */}
            <div className="flex flex-col items-start space-y-5 mt-16 text-gray-800 dark:text-gray-100">
              <Link
                to="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/account"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Account
              </Link>
            </div>

            {/* Sign out button */}
            <button className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 shadow-lg transition-colors">
              <Link
                to="/login"
                onClick={handleSignOut}
                className="w-full text-center"
              >
                Sign Out
              </Link>
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Menu;
