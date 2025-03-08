import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    
    // Set background image based on the mode
    document.body.style.backgroundImage = darkMode
    ? "url('/assets/night.jpg')"  // Path from the public folder
    : "url('/assets/day.jpg')"; 
    document.body.style.backgroundSize = 'cover';  // Optional: makes the image cover the entire background
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat'; 
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden'; // Optional: centers the background image
  }, [darkMode]);
  

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, editing: false }]);
      setNewTask("");
    }
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editing = true;
    setTasks(updatedTasks);
  };

  const saveEdit = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    updatedTasks[index].editing = false;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
  <div className="container">
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
    <h1>To-Do List</h1>
    <div className="input-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
        className="task-input"
      />
      <button onClick={addTask} className="add-btn">Add</button>
    </div>
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
    </div>
    <ul>
      {filteredTasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          {task.editing ? (
            <input
              type="text"
              defaultValue={task.text}
              onBlur={(e) => saveEdit(index, e.target.value)}
              autoFocus
            />
          ) : (
            <span>{task.text}</span>
          )}
          <button onClick={() => toggleCompletion(index)}>✅</button>
          <button onClick={() => startEditing(index)}>✏️</button>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default TodoApp;
