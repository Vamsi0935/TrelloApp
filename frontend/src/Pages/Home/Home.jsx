/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import SubHome from "../SubHome/SubHome";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="sub-navbar">
        <p>
          Accelerate your teams' work with Atlassian Intelligence (AI) features
          🤖 now available for all Premium and Enterprise!
          <a href="">Learn More</a>
        </p>
      </div>
      <div className="row">
        <div className="home-content col-6">
          <h1>
            Trello brings all your <br /> tasks, teammates, and <br /> tools
            together
          </h1>
          <p>
            Keep everything in the same place—even if your team <br /> isn’t.
          </p>
          <form className="row">
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="col-auto">
              <Link to="/signup">
                <button type="submit" className="btn btn-primary mb-3">
                  Sign up - it's free!
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="home-container col-6">
          <img
            src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp"
            alt="home-image"
            width="80%"
          />
        </div>
      </div>
      <SubHome />
      <Footer />
    </>
  );
};

export default Home;
