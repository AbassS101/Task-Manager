const Task = ({ task }) => {
    return (
      <li className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        {task.description && <p className="mt-2 text-gray-600">{task.description}</p>}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Status: {task.status}</span>
          {task.dueDate && (
            <span className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </li>
    );
  };
  
  export default Task;