import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import taskListStyle from "../css/taskList.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const TaskList = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  filterPriority,
  setFilterPriority,
  filterCompletion,
  setFilterCompletion,
}) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPriority, setEditedPriority] = useState("");


  useEffect(() => {
    const savedData = localStorage.getItem("allData");
    if (savedData) {
      setTasks(JSON.parse(savedData));
    }
  }, [setTasks]);

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

   const filteredTasks = [...tasks]
    .sort((a, b) => {
      if (sortOrder === "High to Low") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortOrder === "Low to High") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    })
    .filter((task) => {
      const matchesSearch = searchQuery
        ? task.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesPriority =
        filterPriority === "" || task.priority === filterPriority;
      const matchesCompletion =
        filterCompletion === "" ||
        (filterCompletion === "completed" && task.completed) ||
        (filterCompletion === "incomplete" && !task.completed);

      return matchesSearch && matchesPriority && matchesCompletion;
    });

  

  const toggleComplete = (taskId) => {
    console.log("Toggling task index:", taskId);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("allData", JSON.stringify(updatedTasks));
  };

  const handleDelete = (ID) => {
    const tasks = JSON.parse(localStorage.getItem("allData")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== ID);
    setTasks(updatedTasks);
    localStorage.setItem("allData", JSON.stringify(updatedTasks));
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id
        ? {
            ...task,
            title: editedTitle,
            description: editedDescription,
            priority: editedPriority,
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("allData", JSON.stringify(updatedTasks));
    setEditTask(null);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger text-white";
      case "Medium":
        return "bg-warning text-white";
      case "Low":
        return "bg-success text-white";
      default:
        return "";
    }
  };

  return (
    <>

      <div className={`${editTask ? taskListStyle["blur-background"] : ""}`}>
        <div>
          {filteredTasks.length === 0 ? (
            <p className={`${taskListStyle.NoTaskStyle}`}>
              <strong>
                No tasks found. Please add a task or change your search query!
              </strong>
            </p>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={index}
                className="card my-3"
                style={{ borderRadius: "16px" }}
              >
                <div
                  className={`card-body ${taskListStyle['card-body']} ${getPriorityClass(task.priority)} `}
                  style={{ borderRadius: "15px" }}
                >
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />

                    <h5
                      className={`card-title ${
                        task.completed ? "text-decoration-line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h5>
                    <button
                      className={`${taskListStyle.iconButton}`}
                      onClick={() => handleDelete(task.id)}
                    >
                      <MdDeleteOutline />
                    </button>
                    <button
                      className={`${taskListStyle.iconButton2}`}
                      onClick={() => handleEdit(task)}
                    >
                      <FaEdit />
                    </button>

                    <p className="card-text">{task.description}</p>
                    <div className={`${taskListStyle.PriorityDate}`}>
                      <p className="card-text">
                        <strong>Priority:</strong> {task.priority}
                        <small className={`${taskListStyle.small1}`}>
                          <strong>Due Date:</strong>{" "}
                          {new Date(task.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {editTask && (
        <div className={`${taskListStyle["fullscreen-container"]}`}>
          <div className={`${taskListStyle["centered-form"]}`}>
            <div className={`${taskListStyle["edit-form"]}`}>
              <h4>Edit Task</h4>
              <div>
                <input
                  className={`${taskListStyle.formStyle}`}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Edit Task Title"
                />
              </div>
              <div>
                <textarea
                  className={`${taskListStyle.formStyle}`}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Edit Task Description"
                />
              </div>
              <div>
                <select
                  className={`${taskListStyle.formStyle}`}
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button
                className={`${taskListStyle.buttons1}`}
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className={`${taskListStyle.buttons1}`}
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
