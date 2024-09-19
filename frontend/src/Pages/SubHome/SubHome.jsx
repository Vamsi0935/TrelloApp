import React from "react";
import "./subhome.css";

const SubHome = () => {
  return (
    <>
      <div className="subhome-container">
        <p>Trello 101</p>
        <h3>A productivity powerhouse</h3>
        <p>
          Simple, flexible, and powerful. All it takes are boards, lists, and{" "}
          <br />
          cards to get a clear view of who’s doing what and what needs to <br />{" "}
          get done. Learn more in our{" "}
          <span style={{ color: "blue", textDecoration: "underline" }}>
            guide for getting started.
          </span>
        </p>
        <div className="content">
          <div className="col-6">
            <div className="board">
              <h6 className="card-title">Boards</h6>
              <small className="card-text">
                Trello boards keep tasks organized and <br /> work moving
                forward. In a glance, see <br /> everything from "things to do"
                to "aww <br /> yeah, we did it!"
              </small>
            </div>
            <h6>Lists</h6>
            <small className="card-text">
              The difference stages of a task. Start as <br /> simple as To Do,
              Doing or Done-or build <br /> a workflow custom fir to your team's{" "}
              <br /> needs. There's no wrong way to Trello.
            </small>
            <h6>Cards</h6>
            <small className="card-text">
              Cards represents the tasks and ideas and
              <br /> hold all the information to get the job done. <br /> As you
              make progress, move cards <br /> across lists to show their
              status.
            </small>
          </div>
          <div className="col-6">
            <img
              src="https://cdn.prod.website-files.com/62a4688b769b37698f1c518d/64ddd68efeff402dc9ce6c9b_yAgPaMC6EgS7GXI5oUMZemXwu_MCo73qnehbc50w1C-suJnwTgoGWRtDc6AgG761a3Ws8-0yq0CUjSwiDv5UIrLNp2p0V8gGjJyY_xBXnKJJ5gpGRBeqlrr8cjiixB5Fqnfv3kVq-8qSUWlcWjswZQs.png"
              alt="pic"
            />
          </div>
        </div>
        <p className="pt-5">
          Join over 2,000,000 teams worldwide that are using Trello to get more
          done.
        </p>
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/19rAABnbk8KNNuh3zJzsmr/210fb8ee51dea14595462f844b7c9beb/logos-horizontal-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg"
          alt="logo"
          style={{marginLeft:"20%"}}
        />
      </div>
    </>
  );
};

export default SubHome;
