import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

const AddingTasks = () => {
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (addTask.trim().length > 0) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: addTask },
      ]);
      setAddTask("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleDeleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const confirmDelete = confirm(`Delete "${task.text}"?`);
    if (confirmDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleModify = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = (button) => {
    if (button === "save") {
      if (editingText.trim().length === 0) {
        alert("Task can not be empty field! Please add a task!");
        return;
      }

      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId ? { ...t, text: editingText } : t
        )
      );
      setEditingTaskId(null);
      setEditingText("");
    } else if (button === "cancel") {
      setEditingTaskId(null);
      setEditingText("");
    }
  };

  return (
    <>
      <div className="p-2 rounded-2xl bg-white max-w-md w-full mx-auto shadow-lg">
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

      {tasks.length === 0 ? (
        <p className="mt-5 text-gray-400">You have no tasks. Create some 😊</p>
      ) : (
        <div
          className="
    py-2.5 mt-3.5 flex flex-wrap justify-center gap-4
    border-2 border-white rounded-sm overflow-y-scroll max-h-96
    w-full max-w-4xl shadow-md
  "
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              className="
  bg-amber-100 hover:bg-amber-200 rounded-xl shadow-md 
  px-4 py-3 mb-3 mx-2 text-left flex flex-col justify-between basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4
"
            >
              {editingTaskId === task.id ? (
                <div className="flex justify-between items-center w-full">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={2}
                    placeholder="Edit your task…"
                    spellCheck={true}
                    autoFocus
                    aria-label="Edit task text"
                    className="bg-amber-400 hover:bg-amber-500 rounded-2xl px-2.5 py-1 w-full"
                  ></textarea>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleSaveEdit("save")}
                      className="bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-3xl p-2.5 ml-2"
                    >
                      <MdEdit className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleSaveEdit("cancel")}
                      className="bg-gray-400 hover:bg-gray-500 cursor-pointer rounded-3xl p-2.5 "
                    >
                      <GiCancel className="size-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span>{task.text}</span>
                  <div className="flex gap-0">
                    <button
                      className="bg-red-400 hover:bg-red-500 cursor-pointer rounded-3xl p-2.5"
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrashCan className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleModify(task)}
                      className="bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-3xl p-2.5 ml-1"
                    >
                      <MdEdit className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddingTasks;
