import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiMicrosoft, SiApple } from "react-icons/si";
import { BsSlack } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Sign up successful",
            text: "You have successfully signed up! Redirecting to login page...",
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sign up failed",
          text: error.response?.data?.msg || "An unexpected error occurred.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please correct the errors in the form.",
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
          <p>Sign up to continue</p>

          <div className="mb-3">
            <input
              type="email"
              className={`form-control w-100 ${emailError ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="mb-3 password-field">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control w-100 ${
                  passwordError ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>

          <small>
            By signing up, I accept the Atlassian{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              Cloud Terms of Service
            </span>{" "}
            and acknowledge the{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              Privacy Policy.
            </span>
          </small>

          <div>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSignUp}
            >
              Sign Up
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
            <Link to="/signin" className="text-decoration-none">
              Already have an Atlassian account? Log in
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
                <span style={{ color: "blue" }}> Terms of Service apply.</span>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
