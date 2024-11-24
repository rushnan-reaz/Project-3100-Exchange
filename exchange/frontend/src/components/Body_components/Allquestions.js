import React from 'react'
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import "./CSS/Allquestions.css";

function Allquestions() {
  return (
    <div className="all-q">
      <div className={"all-q-container"}>
        <div className={"all-q-left"}>
          <div className={"all-options"}>
            <div className={"all-option"}>
              <p>0</p>
              <span>votes</span>
            </div>
            <div className={"all-option"}>
              <p>0</p>
              <span>answers</span>
            </div>
            <div className={"all-option"}>

              <small>0 visitors</small>
            </div>
          </div>
        </div>
        <div className={"que-ans"}>
          <Link>question title</Link>
          <div style={{width: "90%"}}>
            <div>Answer</div>
          </div>
          <div style={{display: "flex"}}>
            <span className={"tags"}>tag1</span>
            <span className={"tags"}>tag2</span>
            <span className={"tags"}>tag3</span>
          </div>
          <div className={"author"}>
            <small>Timestamp</small>
            <div className={"author-info"}>
              <Avatar/>
              <p>Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allquestions;