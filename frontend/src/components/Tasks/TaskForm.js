import React, { useState, useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const { createTask } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, priority, dueDate });
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    } catch (error) {
      console.error('Task creation error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;