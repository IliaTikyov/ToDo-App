import { useState } from "react";

const AddingTasks = () => {
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (addTask.trim().length > 0) {
      setTasks((prevTasks) => [...prevTasks, addTask]);
      setAddTask("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="p-2 rounded-2xl bg-white max-w-md w-full mx-auto">
        <form onSubmit={handleAddTask}>
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              placeholder="Enter A Task"
              value={addTask}
              onChange={(event) => setAddTask(event.target.value)}
            />
            <button
              type="submit"
              className="bg-green-300 rounded-3xl px-3 py-2 text-white font-bold hover:bg-green-400 cursor-pointer"
            >
              +Add
            </button>
          </div>
        </form>

        {error && (
          <p className="text-red-500 font-black flex justify-center mt-3">
            Task should have at least 1 character!
          </p>
        )}
      </div>

      <div className="py-2.5">
        {tasks.map((task, index) => (
          <>
            <div className="bg-amber-200 px-5" key={index}>
              {task}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default AddingTasks;
