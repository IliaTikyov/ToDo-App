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
      className="bg-amber-100 hover:bg-amber-200 rounded-xl shadow-md px-4 py-3 mb-3 mx-2 text-left flex flex-col justify-between basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
    >
      {isEditing ? (
        <div className="flex justify-between items-center w-full">
          <textarea
            value={editingText}
            onChange={(e) => onChangeEditingText(e.target.value)}
            rows={2}
            placeholder="Edit your task…"
            spellCheck={true}
            autoFocus
            aria-label="Edit task text"
            className="bg-amber-400 hover:bg-amber-500 rounded-2xl px-2.5 py-1 w-full"
          />
          <div className="flex gap-1">
            <button
              onClick={onSaveEdit}
              className="bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-3xl p-2.5 ml-2"
            >
              <MdEdit className="size-3.5" />
            </button>
            <button
              onClick={onCancelEdit}
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
              onClick={() => onDelete(task.id)}
            >
              <FaTrashCan className="size-3.5" />
            </button>
            <button
              onClick={() => onStartEdit(task)}
              className="bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-3xl p-2.5 ml-1"
            >
              <MdEdit className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
