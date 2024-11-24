import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CSS/Index.css";

function MainQue() {
  const [show, setShow] = useState(false);

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">Question Title</h2>
          <Link to="/question" className="main-ask">
            <button>Ask Question</button>
          </Link>
        </div>

        <div className="main-description">
          <div className="info">
            <p>Timestamp</p>
            <p>
              Active<span>Today</span>
            </p>
            <p>
              Viewed<span>Times</span>
            </p>
          </div>
        </div>

        <div className="all-questions">
          <div className="all-question-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="stat">0</p>
                <p className="like1">
                  <ThumbUpOffAltIcon />
                </p>

                <p className="stat">0</p>
                <p className="like2">
                  <ThumbDownOffAltIcon />
                </p>

                <BookmarkIcon className="icons" />
                <HistoryIcon className="icons"/>
              </div>
            </div>
            <div className="all-questions-right">
              <p>Question Description</p>
              <div className="author">
                <small>Asked: "Timestamp"</small>
                <div className="author-info">
                  <Avatar />
                  <p>author name</p>
                </div>
              </div>
              <div className="comments">
                <p className="text">
                  Comment made - <span>User Name</span> <small>Timestamp</small>
                </p>
                <p className="text-link" onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="add-comment">
                    <textarea
                      placeholder="Add your comment"
                      rows={3}
                    ></textarea>
                    <button>Post Comment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="all-questions">
          <p>Number of Answers</p>
        </div>

        <div className="all-question-container">
          <div className="all-questions-left">
            <div className="all-options">
              <p className="stat">0</p>
              <p className="like1">
                <ThumbUpOffAltIcon />
              </p>

              <p className="stat">0</p>
              <p className="like2">
                <ThumbDownOffAltIcon />
              </p>

              <BookmarkIcon className="icons" />
              <HistoryIcon className="icons"/>
            </div>
          </div>
          <div className="all-questions-right">
            <p>Answers Description</p>
            <div className="author">
              <small>Answered: "Timestamp"</small>
              <div className="author-info">
                <Avatar />
                <p>author name</p>
              </div>
            </div>
          </div>
        </div>

        <div className="main-answer">
          <h3>Your Answer</h3>
          <ReactQuill theme="snow" placeholder="Write your answer here..." />
          <button>Post Answer</button>
        </div>
      </div>
    </div>
  );
}

export default MainQue;
