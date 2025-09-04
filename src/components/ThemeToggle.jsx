import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

const ThemeToggle = ({ className }) => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const baseBtn =
    "p-2 rounded-full transition outline-none focus:ring focus:ring-offset-2 dark:focus:ring-offset-zinc-800";
  const activeLight = "bg-white text-yellow-500 shadow dark:bg-zinc-700";
  const activeDark = "bg-gray-800 text-blue-400 shadow dark:bg-zinc-600";
  const inactive = "hover:bg-gray-200 dark:hover:bg-zinc-700";

  return (
    <div
      className={
        "bg-yellow-50 dark:bg-zinc-800 p-2 flex gap-6 border rounded-full text-2xl " +
        className
      }
      aria-label="Theme toggle"
    >
      <button
        onClick={() => setIsDark(false)}
        aria-label="Light theme"
        aria-pressed={!isDark}
        className={`${baseBtn} ${!isDark ? activeLight : inactive}`}
        title="Light"
      >
        <LuSun />
      </button>

      <button
        onClick={() => setIsDark(true)}
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
