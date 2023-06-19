import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./components/Todo";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "Test",
      category: "Test",
      description: "Testowy opis",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Test2",
      category: "Testowa",
      description:"Testowy opis v2",
      completed: false,
    },
  ]);

  const handleDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "" || categoryValue.trim() === "" || descriptionValue.trim() === "") {
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      category: categoryValue,
      description: descriptionValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setInputValue("");
    setCategoryValue("");
    setDescriptionValue("");
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl text-gray-800 font-bold mb-5">To-Do App</h1>
      <div className="bg-white shadow-lg rounded-lg w-2/3 mx-auto">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            category={todo.category}
            completed={todo.completed}
            description={todo.description}
            id={todo.id}
            handleDone={handleDone}
            handleDelete={handleDelete}
          />
        ))}
        <div className="p-4">
          <div className="flex flex-col mb-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-1"
              placeholder="Enter a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-1"
              placeholder="Enter the category..."
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            />
             <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-1"
              placeholder="Enter the description"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
