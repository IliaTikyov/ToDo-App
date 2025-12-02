import { useMemo } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCard = ({
  task,
  isEditing,
  editingText,
  onChangeEditingText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
               rounded-xl shadow-md px-4 py-3 mb-3 mx-2 text-left flex flex-col justify-between 
               basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 transition-colors"
    >
      {isEditing ? (
        <div className="flex justify-between items-start w-full gap-2">
          <textarea
            value={editingText}
            onChange={(e) => onChangeEditingText(e.target.value)}
            rows={2}
            placeholder="Edit your task…"
            spellCheck={true}
            autoFocus
            aria-label="Edit task text"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 text-sm
                     text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex gap-1">
            <button
              onClick={onSaveEdit}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400
                       cursor-pointer rounded-full p-2.5 text-white transition-colors"
            >
              <MdEdit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onCancelEdit}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500
                       cursor-pointer rounded-full p-2.5 text-gray-700 dark:text-gray-100 transition-colors"
            >
              <GiCancel className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full gap-2">
          <span className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line pr-2">
            {task.text}
          </span>
          <div className="flex">
            <button
              className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400
                       cursor-pointer rounded-full p-2.5 text-white transition-colors"
              type="button"
              onClick={() => onDelete(task.id)}
            >
              <FaTrashCan className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onStartEdit(task)}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400
                       cursor-pointer rounded-full p-2.5 ml-2 text-white transition-colors"
            >
              <MdEdit className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
