import React, { useState, useRef, useEffect, useContext } from "react";
import "./CSS/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import { Avatar } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import logo_light from "./logo-no-background.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/authcontext.js";
import { SearchContext } from "../../context/searchcontext.js";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const menuRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const { setGlobalSearch, setForceRefresh } = useContext(SearchContext);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setGlobalSearch(searchQuery.trim());
      history.push({
        pathname: '/',
        search: `?search=${encodeURIComponent(searchQuery.trim())}`
      });
    }
  };

  const handleLogoClick = () => {
    setSearchQuery("");
    setGlobalSearch("");
    setForceRefresh(true);
    history.replace("/");
  };

  return (
    <header className="Header">
      <div className="Header-container">
        <div className="header-left">
          <Link to="/" onClick={handleLogoClick}>
            <img className="logo" src={logo_light} alt="logo" />
          </Link>
        </div>

        <div className="header-mid">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by word or phrase"
            />
            <button type="submit">
              <SearchIcon className="SearchIcon" />
            </button>
          </form>
        </div>

        <div className="header-right" ref={menuRef}>
          {user ? (
            <div className="header-right-container">
              <div className="user-menu-trigger" onClick={toggleMenu}>
                <Avatar />
              </div>

              <div className={`user-menu ${show ? "show" : ""}`}>
                <div className="user-info">
                  <Link to="/dashboard" className="profile-link">
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