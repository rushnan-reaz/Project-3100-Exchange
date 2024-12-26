import React, { useState, useRef, useEffect } from "react";
import "./CSS/Header.css"; // Import the CSS file
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
// import TableRowsIcon from "@mui/icons-material/TableRows";
import logo_light from "./logo-no-background.png";
// import logo_dark from "./logo_no_background_dark";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authcontext.js";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log("Error logging out:", error);
      alert("Error logging out. Please try again later.");
    }
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <header className="Header">
      <div className="Header-container">
        <div className="header-left">
          <Link to="/">
            <img className="logo" src={logo_light} alt="logo" />
          </Link>
        </div>

        <div className="header-mid">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="SearchIcon" />
        </div>

        <div className="header-right" ref={menuRef}>
          {user ? (
            <div className="header-right-container">
              <div className="user-menu-trigger" onClick={toggleMenu}>
                <Avatar />
                {/* <Avatar>{user.username?.[0]?.toUpperCase()}</Avatar> */}
              </div>

              <div className={`user-menu ${show ? 'show' : ''}`}>
                <div className="user-info">
                  <Link to="/profile" className="profile-link">
                    <div className="profile-content">
                      <Avatar>{user.username?.[0]?.toUpperCase()}</Avatar>
                      <span className="username">{user.username}</span>
                    </div>
                  </Link>
                </div>
                <ul className="menu-list">
                  <li>
                    <Link to="/inbox" className="menu-item">
                      <InboxIcon />
                      <span>Inbox</span>
                    </Link>
                  </li>
                  <li>
                    <div className="menu-item" onClick={handleLogout}>
                      <LogoutIcon />
                      <span>Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;