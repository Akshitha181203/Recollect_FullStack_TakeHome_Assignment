import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";

export default function LandingPage() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ assignee: "", status: "" });

  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        name: "Design homepage",
        assignee: "Alice",
        category: "UI/UX",
        status: "in_progress",
        due_date: "2025-03-30",
      },
      {
        id: 2,
        name: "Deploy backend",
        assignee: "Bob",
        category: "DevOps",
        status: "todo",
        due_date: "2025-04-01",
      },
      {
        id: 3,
        name: "Write tests",
        assignee: "Alice",
        category: "QA",
        status: "done",
        due_date: "2025-03-25",
      },
    ];

    let filteredTasks = mockTasks;

    if (filters.assignee) {
      filteredTasks = filteredTasks.filter(task =>
        task.assignee.toLowerCase().includes(filters.assignee.toLowerCase())
      );
    }

    if (filters.status) {
      filteredTasks = filteredTasks.filter(task =>
        task.status === filters.status
      );
    }

    setTasks(filteredTasks);
  }, [filters]);

  const handleUpload = () => {
    alert("Upload button clicked!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧠 Team Task Tracker</h1>
      <FilterBar filters={filters} setFilters={setFilters} onUpload={handleUpload} />
      <TaskTable tasks={tasks} />
    </div>
  );
}
