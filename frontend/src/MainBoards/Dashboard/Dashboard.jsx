import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import AppBar from "../AppBar/AppBar";

const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div className="d-flex">
        <Sidebar />
      </div> 
    </div>
  );
};

export default Dashboard;
