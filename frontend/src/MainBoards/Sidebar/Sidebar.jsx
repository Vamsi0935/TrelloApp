import React, { useState } from "react";
import Workspace from "../../Components/Workspace/Workspace";
import Table from "../../Components/Table/Table";
import Calendar from "../../Components/Calendar/Calendar";
import Dashboard from "../../Home/Dashboard";
import Member from "../Members/Member";
import "./sidebar.css";
import { FaFlipboard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTable } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("boards");

  const renderContent = () => {
    switch (activeTab) {
      case "members":
        return <Member />;
      case "workspace-settings":
        return <Workspace />;
      case "table":
        return <Table />;
      case "calendar":
        return <Calendar />;
      default:
        return (
          <div className="d-flex">
            <Dashboard />
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className={`sidebar-nav-link ${activeTab === "boards" ? "active" : ""}`}
            onClick={() => setActiveTab("boards")}
          >
            <FaFlipboard />
            Boards
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`sidebar-nav-link ${activeTab === "members" ? "active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            <CgProfile />
            Members
          </button>
        </li>
        {/* <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "workspace-settings" ? "active" : ""
            }`}
            onClick={() => setActiveTab("workspace-settings")}
          >
            Workspace Settings
          </button>
        </li> */}
        <li className="nav-item">
          <button
            className={`sidebar-nav-link ${activeTab === "table" ? "active" : ""}`}
            onClick={() => setActiveTab("table")}
          >
            <AiOutlineTable />
            Table
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`sidebar-nav-link ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            <SlCalender />
            Calendar
          </button>
        </li>
      </ul>
      <div className="p-3">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
