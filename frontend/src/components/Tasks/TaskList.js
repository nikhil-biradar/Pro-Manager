import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

const TaskList = () => {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => updateTask(task._id, { status: 'In-Progress' })}>Start</button>
          <button onClick={() => updateTask(task._id, { status: 'Done' })}>Complete</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;