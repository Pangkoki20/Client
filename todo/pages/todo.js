import { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Read book" },
    { id: 2, name: "Write a program" },
  ]);
  const [name, setName] = useState("");
  const [idEdit, setIdEdit] = useState(0);

  const renderTasks = () => {
    console.log("Task:", tasks);
    if (tasks.length !== 0)
      return tasks.map((task, index) => (
        <li key={index}>
          {task.id}:
          {+idEdit !== task.id ? (
            task.name
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <button onClick={() => editTasks(task.id)}>Edit</button>
          <button onClick={() => deleteTasks(task.id)}>Delete</button>
        </li>
      ));
  };
  const editTasks = (id) => {
    console.log(id);
    setIdEdit(id);
    let t = tasks.find((task) => +task.id === +id);
    setName(t.name);
    if (+idEdit === +id) {
      let newTasks = tasks.map((task) => {
        if (+tasks.id === +task.id) task.name = name;
        return tasks;
      });
      setTasks(newTasks);
      setIdEdit(0);
    }
  };

  const deleteTasks = (id) => {
    console.log("delete id: ", id);
    let newTasks = tasks.filter((tasks) => tasks.id !== +id);
    setTasks(newTasks);
  };

  const addTasks = () => {
    console.log("Add task");
    let id = tasks[tasks.length - 1].id + 1;
    setTasks([...tasks, { id, name }]);
    console.log("tasks", tasks);
  };
  return (
    <div>
      <h1> Todo</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => addTasks()}> Add</button>
      <ul>{renderTasks()}</ul>
    </div>
  );
};
export default Todo;
