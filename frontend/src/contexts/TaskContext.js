import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(response.data);
      };
      fetchTasks();
    }
  }, [user]);

  const createTask = async (task) => {
    const response = await axios.post('/api/tasks', task, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTasks([...tasks, response.data]);
  };

  const updateTask = async (id, updates) => {
    const response = await axios.put(`/api/tasks/${id}`, updates, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };