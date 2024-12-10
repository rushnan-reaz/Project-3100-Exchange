import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CSS/Index.css";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/userSlice";

function MainQue() {
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const [questiondata, setQuestiondata] = useState();
  const [selectedAnswerId, setSelectedAnswerId] = useState();

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let question_id = params.get("q");

  const handleAnswer = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/question/${question_id}`);
        console.log(res.data);
        setQuestiondata(res.data);
      } catch (error) {
        console.log(
          error.response ? error.response.data.message : error.message
        );
      }
    };
    fetchQuestion();
  }, [question_id]);

  async function updateAnswer() {
    try {
      const res = await axios.get(`/api/question/${question_id}`);
      console.log(res.data);
      setQuestiondata(res.data);
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  }

  const handleSubmit = async () => {
    if (answer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }

    const answerData = {
      question_id: question_id,
      answer: answer,
      created_at: new Date(),
      user: user,
    };

    try {
      await axios.post("/api/answer", answerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Answer posted successfully");
      setAnswer("");
      updateAnswer();
    } catch (error) {
      console.error("Error posting answer:", error);
      alert(
        error.response?.data?.message ||
          "Failed to post answer. Please try again."
      );
    }
  };

  const handleComment = async () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    const commentData = {
      question_id: questiondata._id,
      answer_id: selectedAnswerId,
      comment: comment,
      user: user,
    };

    try {
      await axios.post("/api/comment/", commentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Comment posted successfully");
      setComment("");
      setShow(false);
      updateAnswer();
    } catch (error) {
      console.error("Error posting comment:", error);
      alert(
        error.response?.data?.message ||
          "Failed to post comment. Please try again."
      );
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questiondata?.title}</h2>
          <Link to="/add-question" className="main-ask">
            <button>Ask Question</button>
          </Link>
        </div>

        <div className="main-description">
          <div className="info">
            <p>{new Date(questiondata?.created_at).toLocaleString()}</p>
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
              </div>
            </div>
            <div className="all-questions-right">
              <p>{ReactHtmlParser(questiondata?.description)}</p>
              <div className="author">
                <small>Asked by:</small>
                <div className="author-info">
                  <Avatar />
                  <p>{questiondata?.user?.username || "Anonymous"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="all-questions">
          <p>Total answers = {questiondata?.answers?.length || 0}</p>
        </div>
        {questiondata?.answers?.map((answer) => (
          <div key={answer._id} className="all-question-container">
            <div className="all-questions-left">
              <div className="all-options">
                {/* Displaying like and dislike stats */}
                <p className="stat">{answer?.likes?.length || 0}</p>
                <p className="like1">
                  <ThumbUpOffAltIcon />
                </p>
                <p className="stat">{answer?.dislikes?.length || 0}</p>
                <p className="like2">
                  <ThumbDownOffAltIcon />
                </p>
              </div>
            </div>
            <div className="all-questions-right">
              <p>{ReactHtmlParser(answer?.answer)}</p>
              <div className="author">
                <small className="date">
                  Answered on:
                  <span>
                    {new Date(answer?.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(answer?.createdAt).toLocaleTimeString()}
                  </span>
                </small>
                <div className="author-info">
                  <Avatar />
                  <p>{answer.user?.username || "Anonymous"}</p>
                </div>
              </div>
              <div className="comments">
                {/* Display Existing Comments for the Selected Answer */}
                {answer.comments && answer.comments.length > 0 ? (
                  answer.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>
                        {comment.comment}{" "}
                        <span>- {comment.user?.username || "Anonymous"}</span>
                      </p>
                      <small>
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleString()
                          : "Date not available"}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}

                {/* Add Comment Section */}
                <p className="text-link" onClick={() => setShow(!show)}>
                  Add a comment
                </p>
                {show && (
                  <div className="add-comment">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your comment"
                      rows={3}
                    ></textarea>
                    <button onClick={handleComment}>Post Comment</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="main-answer">
          <h3>Your Answer</h3>
          <ReactQuill
            value={answer}
            onChange={handleAnswer}
            className="Quill"
            theme="snow"
            placeholder="Write your answer here..."
          />
          <button type="submit" onClick={handleSubmit}>
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainQue;
