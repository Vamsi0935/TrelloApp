import React from "react";
import { PiLinkSimpleBold } from "react-icons/pi";
import "./member.css";

const Member = () => {
  return (
    <>
      <div className="left-bar">
        <h5>Workspace members</h5>
        <small>
          Workspace members can view and join all Workspace visible boards and
          create new boards in the Workspace.
        </small>
      </div>
      <div className="right-bar">
        <div>
          <h5>Invite members to join you</h5>
          <small>
            Anyone with an invite link can join this free Workspace. You can
            also <br />
            disable and create a new invite link for this Workspace at any time.{" "}
            <br />
            Pending invitations count toward the 10 collaborator limit.
          </small>
        </div>
        <div className="link-buttons">
          <button className="btn">Disable invite link</button>
          <button className="btn btn-outline-primary">
            {" "}
            <PiLinkSimpleBold />
            Invite with link
          </button>
        </div>
      </div>
    </>
  );
};

export default Member;
