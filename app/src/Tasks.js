import * as React from "react";

import * as apiClient from "./apiClient";

import "./App.css";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  const deleteTask = (id) => apiClient.deleteTask(id).then(loadTasks);

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section>
      <span id="recipe-toolbox-title">Recipe ToolBox</span>
      <span id="task-list-title">Directions</span>
      <span id="task-list">
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </span>
      <span id="add-task">
        <AddTask {...{ addTask }} loadTasks={loadTasks} />
      </span>
    </section>
  );
};

const TaskList = ({ tasks, deleteTask }) => (
  <ol>
    {tasks.map(({ id, name }) => (
      <li key={id}>
        <span
          role="button"
          tabIndex="0"
          onKeyDown={() => deleteTask(id)}
          id="recipe_name"
          onClick={() => deleteTask(id)}
        >
          {name}
        </span>
      </li>
    ))}
  </ol>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Directions:<br></br>
        <input
          placeholder="Enter Task"
          onChange={(e) => setTask(e.currentTarget.value)}
          value={task}
        />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Tasks;
