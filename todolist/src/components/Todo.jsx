import React, { useState } from "react";

const Todo = ({ title, completed, id, handleDone, handleDelete, category, description }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const renderActionButton = () => {
    if (completed) {
      return (
        <button
          onClick={() => handleDone(id)}
          className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded transition-colors duration-200"
        >
          Undo
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleDone(id)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors duration-200"
        >
          Done
        </button>
      );
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className={`text-gray-800 text-lg ${completed ? "line-through" : ""}`}>
            {title}
          </p>
          <p className="text-sm text-gray-500 ml-2">{category}</p>
        </div>
        {isDescriptionVisible && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
      </div>
      <div className="flex items-center">
        <div className="space-x-2">
          {renderActionButton()}
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={toggleDescription}
            className="bg-green-800 hover:bg-green-900 text-white py-1 px-3 rounded transition-colors duration-200"
          >
            {isDescriptionVisible ? "Hide" : "Show"} Description
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
