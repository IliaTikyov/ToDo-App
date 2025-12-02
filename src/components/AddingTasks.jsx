import { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";

const AddingTasks = () => {
  const [addTask, setAddTask] = useState("");
  const [error, setError] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [tasks, setTasks] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const tasksCol = collection(db, "users", user.uid, "tasks");
    const q = query(tasksCol, orderBy("position", "asc"));

    const unsub = onSnapshot(q, (snap) => {
      const next = snap.docs.map((d, idx) => {
        const data = d.data() || {};
        return {
          id: d.id,
          text: data.text || "",
          position: typeof data.position === "number" ? data.position : idx,
        };
      });
      setTasks(next);
    });

    return () => unsub();
  }, []);

  const getIndex = (id) => tasks.findIndex((t) => t.id === id);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const from = getIndex(active.id);
    const to = getIndex(over.id);
    if (from === -1 || to === -1) return;

    const reordered = arrayMove(tasks, from, to);
    setTasks(reordered);

    const user = auth.currentUser;
    if (!user) return;
    try {
      const batch = writeBatch(db);
      reordered.forEach((t, idx) => {
        batch.update(doc(db, "users", user.uid, "tasks", t.id), {
          position: idx,
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (err) {
      console.error("Failed to persist order:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const text = addTask.trim();
    if (!text) {
      setError(true);
      return;
    }
    setError(false);

    const user = auth.currentUser;
    if (!user) return;

    try {
      const tasksCol = collection(db, "users", user.uid, "tasks");
      const nextPos = tasks.length;
      await addDoc(tasksCol, {
        text,
        completed: false,
        position: nextPos,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setAddTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (!confirm(`Delete "${task.text}"?`)) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "tasks", id));

      const remaining = tasks.filter((t) => t.id !== id);
      setTasks(remaining);

      const batch = writeBatch(db);
      remaining.forEach((t, idx) => {
        batch.update(doc(db, "users", user.uid, "tasks", t.id), {
          position: idx,
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = async () => {
    const text = editingText.trim();
    if (!text) {
      alert("Task can not be empty field! Please add a task!");
      return;
    }

    const user = auth.currentUser;
    if (!user || !editingTaskId) return;

    try {
      await updateDoc(doc(db, "users", user.uid, "tasks", editingTaskId), {
        text,
        updatedAt: serverTimestamp(),
      });
      setEditingTaskId(null);
      setEditingText("");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };
  return (
    <>
      {/* Add Task Card */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-md w-full mx-auto shadow-lg">
        <form onSubmit={handleAddTask}>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a task"
              value={addTask}
              onChange={(e) => setAddTask(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-3xl px-4 py-2 font-semibold text-sm
                       bg-indigo-600 hover:bg-indigo-700 
                       text-white shadow-sm cursor-pointer
                       transition-colors"
            >
              + Add
            </button>
          </div>
        </form>

        {error && (
          <p className="text-red-500 dark:text-red-400 font-semibold flex justify-center mt-3 text-sm">
            Task should have at least 1 character!
          </p>
        )}
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="mt-5 text-gray-400 dark:text-gray-500 text-sm">
          You have no tasks. Create some 😊
        </p>
      ) : (
        <div
          className="py-3 mt-4 flex flex-wrap justify-center gap-4 
                      bg-white dark:bg-gray-800 
                      border border-gray-200 dark:border-gray-700 
                      rounded-2xl overflow-y-auto max-h-96 
                      w-full max-w-4xl mx-auto shadow-md"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map((t) => t.id)}
              strategy={rectSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isEditing={editingTaskId === task.id}
                  editingText={editingTaskId === task.id ? editingText : ""}
                  onChangeEditingText={setEditingText}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  onDelete={handleDeleteTask}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
};

export default AddingTasks;
