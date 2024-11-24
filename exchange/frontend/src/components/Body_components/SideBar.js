import React from "react";
import "./CSS/Sidebar.css";
import Public from "@mui/icons-material/Public";
import Stars from "@mui/icons-material/Stars";
import Work from "@mui/icons-material/Work";
import { Link }  from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-options">
            <Link href="#home">Home</Link>
          </div>
          <div className="sidebar-options">
            <p>PUBLIC</p>
            <div className="Link">
              <div className="Link-tag">
                <Public />
                <Link href="#questions">Questions</Link>
              </div>
              <div className="tag">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>

          <div className="sidebar-options">
            <p>COLLECTIVES</p>
            <div className="Link">
              <div className="Link-tag">
                <Stars />
                <Link href="#explore-collectives">Explore Collectives</Link>
              </div>
            </div>
          </div>

          <div className="sidebar-options">
            <p>FIND A JOB</p>
            <div className="Link">
              <div className="Link-tag">
                <Link href="#question">Question</Link>
              </div>
              <div className="tag">
                <p>Jobs</p>
                <p>Companies</p>
                <p>Discussions</p>
              </div>
            </div>
          </div>

          <div className="sidebar-options">
            <p>TEAMS</p>
            <div className="Link">
              <div className="Link-tag">
                <Work />
                <Link href="#companies">Companies</Link>
              </div>
              <div className="tag">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
