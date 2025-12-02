import { LuListTodo } from "react-icons/lu";

const Header = ({ className = "" }) => {
  return (
    <header>
      <h1
        className={
          "text-3xl font-extrabold mb-6 flex items-center tracking-tight " +
          "text-gray-800 dark:text-gray-100 " +
          className
        }
      >
        ToDo App
        <LuListTodo className="ml-3 text-indigo-600 dark:text-indigo-400" />
      </h1>
    </header>
  );
};

export default Header;
