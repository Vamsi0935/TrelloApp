import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiMicrosoft, SiApple } from "react-icons/si";
import { BsSlack } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "Redirecting to dashboard...",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text:
          error.response && error.response.data
            ? error.response.data.msg
            : "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <div className="card-body">
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo.png"
            alt="logo"
            width="40%"
          />
          <p>Sign In to continue</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control w-100"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control w-100"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignIn}
            >
              Continue
            </button>
          </div>
          <p className="mt-3">Or continue with: </p>
          <div className="signup-ways">
            <p>
              <FcGoogle />
              Google
            </p>
            <p>
              <SiMicrosoft /> Microsoft
            </p>
            <p>
              <SiApple /> Apple
            </p>
            <p>
              <BsSlack /> Slack
            </p>
          </div>
          <div className="text-center">
            <Link to="/signup" className="text-decoration-none">
              Can't log in? Create an account
            </Link>
          </div>
          <hr />
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/2560px-Atlassian-logo.svg.png"
              alt="logo"
              width="50%"
              style={{ marginLeft: "25%" }}
            />
            <p>
              <small>
                One account for Trello, Jira, Confluence, and{" "}
                <span style={{ color: "blue" }}>more.</span> <br />
                This site is protected by reCAPTCHA and the Google{" "}
                <span style={{ color: "blue" }}>Privacy Policy</span> and{" "}
                <span style={{ color: "blue" }}>Terms of Service apply.</span>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
