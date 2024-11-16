import React, { useEffect, useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from 'uuid'; 
import inputStyle from "../css/inputStyle.module.css"
const TaskInput = () => {

  const { tasks, setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    createdAt: ""
  });



  useEffect(() => {
    const savedData = localStorage.getItem('allData');
    if (savedData) {
      setTasks(JSON.parse(savedData));
    }
  },[setTasks])

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (!newTask.title || !newTask.description || !newTask.priority) {
      alert("All fields are required.");
      return;
  }


    const updatedData = [...tasks, { ...newTask, completed: false,id: uuidv4() ,createdAt: new Date().toISOString()}];
    setTasks(updatedData)
    localStorage.setItem('allData', JSON.stringify(updatedData));

    setNewTask({ title: "", description: "", priority: "", createdAt: "" });
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Input Fields */}
      <form onSubmit={handleFormSubmission}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={newTask.title}
            placeholder="Enter Title"
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <strong>Description</strong>
          </label>
          <textarea
            required
            className="form-control"
            id="description"
            name="description"
            rows="2"
            placeholder="Enter Description"
            value={newTask.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <label htmlFor="priority" className="form-label">
          <strong>Priority</strong>
        </label>
        <select
          required
          className="form-select"
          aria-label="Default select example"
          name="priority"
          id="priority"
          onChange={onChangeHandler}
        >
          <option defaultValue>Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" className={`btn ${inputStyle.btn}`}>
          Submit
        </button>
      </form>
    </>
  );
};

export default TaskInput;
