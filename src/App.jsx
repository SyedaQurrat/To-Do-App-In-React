import { useEffect, useState } from "react";
import { Header } from "./components/Header/header";
import { Tasks } from "./components/Tasks/tasks";

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  // Load saved tasks from local storage
  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  // Save tasks to local storage
  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  // Add a new task
  function addTask(taskTitle) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]);
  }

  // Delete a task by ID
  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  // Toggle the completed state of a task by ID
  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  // Handle editing a task
  function handleEdit(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      const newTitle = prompt("Edit task title:", taskToEdit.title);
      if (newTitle !== null && newTitle.trim() !== "") {
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        setTasksAndSave(updatedTasks);
      }
    }
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        handleEdit={handleEdit} 
      />
    </>
  );
}

export default App;
