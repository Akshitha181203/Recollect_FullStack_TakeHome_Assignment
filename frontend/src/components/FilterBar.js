import React from "react";

export default function FilterBar({ filters, setFilters, onUpload }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Filter by assignee"
        value={filters.assignee}
        onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        style={{ marginLeft: "10px" }}
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={onUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>
    </div>
  );
}
