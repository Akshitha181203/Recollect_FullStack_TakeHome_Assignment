import React from "react";

export default function TaskTable({ tasks }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const grouped = safeTasks.reduce((acc, task) => {
    const group = task.status || "unknown";
    acc[group] = acc[group] || [];
    acc[group].push(task);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([status, group]) => (
        <div key={status} style={{ marginBottom: "20px" }}>
          <h2>{status.toUpperCase()}</h2>
          <table border="1" cellPadding="5" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Assignee</th>
                <th>Category</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {group.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.assignee}</td>
                  <td>{task.category}</td>
                  <td>{task.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
