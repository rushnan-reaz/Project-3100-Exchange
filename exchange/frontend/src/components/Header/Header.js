import React from "react";
import "./CSS/Header.css"; // Import the CSS file
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import TableRowsIcon from "@mui/icons-material/TableRows";
import logo_light from "./logo-no-background.png";
// import logo_dark from "./logo_no_background_dark";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from '@mui/icons-material/LightMode';
function Header() {
  return (
    <header>
      <div className="Header-container">
        <div className="header-left">
          <Link to="/"><img className="logo" src={logo_light} alt="logo" /></Link>
            
            <ul>
              <li>Home</li>
                <li>Tags</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
          {/* <h3>
            Tags
          </h3>
          <h3>
           About
          </h3>
          <h3>
            Contact
          </h3>
           */}
        </div>
        <div className="header-mid">
        
         
            <input type="text" placeholder="Search"/>
          <SearchIcon className="SearchIcon" />
          
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <ul>
              <li><Avatar/></li>
              <li> <InboxIcon /></li>
              <li><TableRowsIcon /></li>
            </ul>     
          </div>       
        </div>
         <div className="dark-mode">
          <DarkModeIcon/>
         </div>
      </div>
    </header>
  );
}

export default Header;
