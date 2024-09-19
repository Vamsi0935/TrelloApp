import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import { TbGridDots } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoIosNotifications, IoIosHelpCircleOutline } from "react-icons/io";
import "./appbar.css";

const AppBar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios
          .post("http://localhost:5000/api/users/signout", null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              navigate("/signin"); 
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: error.response?.data?.message || "Something went wrong",
            });
          });
      }
    });
  };

  return (
    <div className="appbar-container">
      <div className="left-appbar">
        <TbGridDots />
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1200px-Trello_logo.svg.png"
          alt="logo"
          width="20%"
        />
        <p>Workspaces</p>
        <p>Recent</p>
        <p>Starred</p>
        <p>Templates</p>
        <button className="btn btn-outline-primary">Create</button>
      </div>

      <div className="right-appbar">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            <FiSearch />
          </span>
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="addon-wrapping"
          />
        </div>
        <IoIosNotifications />
        <IoIosHelpCircleOutline />
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppBar;
