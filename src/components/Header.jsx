import { LuListTodo } from "react-icons/lu";

const Header = () => {
  return (
    <header>
      <h1 className="text-3xl font-bold text-white mb-5 flex items-center ">
        ToDo App <LuListTodo className="mx-2.5" />
      </h1>
    </header>
  );
};

export default Header;
