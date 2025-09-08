import { LuListTodo } from "react-icons/lu";

const Header = ({ className }) => {
  return (
    <header>
      <h1
        className={
          "text-3xl font-bold text-gray-600 mb-5 flex items-center  dark:text-white " +
          className
        }
      >
        ToDo App <LuListTodo className="mx-2.5" />
      </h1>
    </header>
  );
};

export default Header;
