import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

const ThemeToggle = ({ className }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (isDark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(isDark === "dark" ? "light" : "dark");
  };

  const baseBtn =
    "p-2 rounded-full transition-colors outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400";

  const activeLight =
    "bg-white text-yellow-500 shadow border border-gray-200 dark:border-gray-600";

  const activeDark =
    "bg-gray-800 text-indigo-400 shadow border border-gray-700 dark:bg-gray-700";

  const inactive =
    "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <div
      className={
        "bg-white dark:bg-gray-900 p-1 flex gap-2 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-xl " +
        className
      }
      aria-label="Theme toggle"
    >
      {/* Light button */}
      <button
        onClick={toggleTheme}
        aria-label="Light theme"
        aria-pressed={!isDark}
        className={`${baseBtn} ${!isDark ? activeLight : inactive}`}
        title="Light"
      >
        <LuSun />
      </button>

      {/* Dark button */}
      <button
        onClick={toggleTheme}
        aria-label="Dark theme"
        aria-pressed={isDark}
        className={`${baseBtn} ${isDark ? activeDark : inactive}`}
        title="Dark"
      >
        <LuMoon />
      </button>
    </div>
  );
};

export default ThemeToggle;
