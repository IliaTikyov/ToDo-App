const AddingTasks = () => {
  return (
    <div className="p-2 rounded-2xl bg-white max-w-md w-full mx-auto">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          placeholder="Enter A Task"
        />
        <button
          type="submit"
          className="bg-green-300 rounded-3xl px-3 py-2 text-white font-bold hover:bg-green-400 cursor-pointer"
        >
          +Add
        </button>
      </div>
    </div>
  );
};

export default AddingTasks;
