import React, {useState} from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import allTaskListStyle from '../css/allTasks.module.css'
const AllTasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCompletion, setFilterCompletion] = useState("");
  return (
    <div className="container mt-4" style={{ maxWidth: "1830px" }}>
      <h1 className="text-center mb-4">Task Tracker</h1>
      <div className="row">
        {/* Task Input and Filters */}
        <div className="col-md-4 mb-4">
          <TaskInput />
          <div className="filter-section mt-5">
            <h4>Filter</h4>
            <select
              className="form-select mb-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Priority</option>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <select
              className="form-select mb-2"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              className="form-select"
              value={filterCompletion}
              onChange={(e) => setFilterCompletion(e.target.value)}
            >
              <option value="">Filter by Completion</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>

        {/* Search Bar and Task List */}
        <div className="col-md-8 mb-4">
          <div className="search-bar mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            className={`task-list-container ${allTaskListStyle["task-list-container"]}`}
          >
            <TaskList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              filterCompletion={filterCompletion}
              setFilterCompletion={setFilterCompletion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
