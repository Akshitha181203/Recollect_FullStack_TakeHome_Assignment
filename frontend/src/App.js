import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Portfolio from "./components/Portfolio/Portfolio";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import UserManagement from "./components/otherpages/UserManagement";
import Auction from "./components/otherpages/Auction";
import Permissions from "./components/otherpages/Permissions";
import ControlPannel from "./components/otherpages/ControlPannel";
import DataUpload from "./components/otherpages/DataUpload";
import Notices from "./components/otherpages/Notices";
import Notifications from "./components/otherpages/Notifications";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Notices" element={<Notices />} />
          <Route path="/DataUpload" element={<DataUpload />} />
          <Route path="/ControlPannel" element={<ControlPannel />} />
          <Route path="/Permissions" element={<Permissions />} />
          <Route path="/Auction" element={<Auction />} />
          <Route path="/UserManagement" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;