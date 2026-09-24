import { useEffect, useState } from 'react';
import axios from 'axios';
import type { TaskItem } from './types';
import './App.css';

const API_URL = 'http://localhost:5072/api/tasks';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  
  // Theme State (Default: light)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Theme මාරු කරන Function එක
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Theme එක වෙනස් වෙනකොට Body එකේ HTML Attribute එක Update කිරීම
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await axios.post(API_URL, {
        title: newTitle.trim(),
        isCompleted: false,
      });
      setNewTitle('');
      await fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      {/* Header කොටස: මාතෘකාව සහ Theme Toggle Button එක */}
      <div className="header">
        <h2>Task Tracker (.NET + React)</h2>
        <button 
  onClick={toggleTheme} 
  className="theme-toggle-btn"
  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
>
  {darkMode ? '☀️ Light' : '🌙 Dark'}
</button>
      </div>

      {/* Input Group */}
      <form onSubmit={(e) => void handleAddTask(e)} className="input-group">
        <input
          type="text"
          className="input-box"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Task Title..."
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;