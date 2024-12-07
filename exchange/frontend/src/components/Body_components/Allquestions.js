import React from 'react';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "./CSS/Allquestions.css";

function Allquestions({ question }) {
  const { title, description, tag = [] } = question;

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
          <Link to={`/question/${question._id}`}>
            {/* <h3>{title}</h3> */}
            {title}
          </Link>
          <div style={{ width: "90%" }}>
            <div>
              {description}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {/* Render tags dynamically */}
            {tag.map((t, index) => (
              <span key={index} className={"tags"}>{t}</span>
            ))}
          </div>
          <div className={"author"}>
            <small>{new Date(question.created_at).toLocaleString()}</small>
            <div className={"author-info"}>
              <Avatar />
              <p>{question.user || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allquestions;
