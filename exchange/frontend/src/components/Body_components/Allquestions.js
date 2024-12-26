import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "./CSS/Allquestions.css";
import DOMPurify from "dompurify";

function Allquestions({ question }) {
  const { title, description, tag = [] } = question;

  // Function to truncate the description to 100 characters
  const truncateDescription = (str, limit) => {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    }
    return str;
  };

  // Sanitize the description to prevent XSS
  const sanitizedDescription = DOMPurify.sanitize(description);

  // Truncate the sanitized description to 100 characters (now truncating sanitized description)
  const truncatedDescription = truncateDescription(sanitizedDescription, 100);

  return (
    <div className="all-q">
      <div className={"all-q-container"}>
        <div className={"all-q-left"}>
          <div className={"all-options"}>
            <div className={"all-option"}>
            <p>{question?.likes?.length || 0}</p>
              <span>likes</span>
            </div>
            <div className={"all-option"}>
              <p>{question?.answers?.length || 0}</p>
              <span>answers</span>
            </div>
            <div className={"all-option"}>
              <small>0 visitors</small>
            </div>
          </div>
        </div>
        <div className={"que-ans"}>
          <Link to={`/question?q=${question._id}`}>{title}</Link>
          <div style={{ width: "90%" }}>
            {/* Show truncated description only */}
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: truncatedDescription,
              }}
            ></div>
          </div>
          <div style={{ display: "flex" }}>
            {/* Render tags dynamically */}
            {tag.length > 0 ? (
              tag.map((t, index) => (
                <span key={index} className={"tags"}>
                  {t}
                </span>
              ))
            ) : (
              <span className="tags">No tags</span>
            )}
          </div>
         
            <div className="author">
              <div className="date-time">
              <small>Asked:</small>
                <small>
                  {new Date(question.created_at).toLocaleDateString()}
                </small>
                <small>
                  {new Date(question.created_at).toLocaleTimeString()}
                </small>
              </div>
              <div className="author-info">
                <Avatar />
                <p>{question.user?.username || "Unknown"}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Allquestions;
