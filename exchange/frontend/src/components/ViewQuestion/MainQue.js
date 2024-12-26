import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CSS/Index.css";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { AuthContext } from "../../context/authcontext";

function MainQue() {
  const [answer, setAnswer] = useState("");
  const [questiondata, setQuestiondata] = useState();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [commentStates, setCommentStates] = useState({});
  const [commentVisibility, setCommentVisibility] = useState({});
  const [commentLoading, setCommentLoading] = useState({});

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let question_id = params.get("q");

  const handleAnswer = (value) => {
    setAnswer(value);
  };

  // In MainQue.js useEffect
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`/api/question/${question_id}`);
        console.log("Raw response:", res.data);

        // Transform and validate data
        const transformedData = {
          ...res.data,
          answers:
            res.data.answers?.map((answer) => ({
              ...answer,
              comments:
                answer.comments
                  ?.filter((comment) => comment && typeof comment === "object")
                  .map((comment) => ({
                    _id: comment._id,
                    comment: comment.comment,
                    createdAt: comment.createdAt,
                    user: comment.user || { username: "Anonymous" },
                    answer_id: answer._id,
                  })) || [],
            })) || [],
        };

        console.log("Transformed data Mainque:", transformedData);
        setQuestiondata(transformedData);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (question_id) {
      fetchQuestion();
    }
  }, [question_id]);

  const updateAnswer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/question/${question_id}`);
      if (res.data.answers) {
        res.data.answers = res.data.answers.map((answer) => ({
          ...answer,
          comments: Array.isArray(answer.comments)
            ? answer.comments.map((comment) => ({
                ...comment,
                user: comment.user || { username: "Anonymous" },
              }))
            : [],
        }));
      }
      setQuestiondata(res.data);
    } catch (error) {
      console.error("Error updating answers:", error);
      alert("Failed to refresh answers");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      alert("Please login to post an answer");
      return;
    }

    if (answer.trim() === "") {
      alert("Answer cannot be empty");
      return;
    }

    const answerData = {
      question_id: question_id,
      answer: answer,
      created_at: new Date(),
      user: user._id,
    };

    try {
      const response = await axios.post("/api/answer", answerData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status) {
        alert("Answer posted successfully");
        setAnswer("");
        updateAnswer();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error posting answer:", error);
      alert(
        error.response?.data?.message ||
          "Failed to post answer. Please try again."
      );
    }
  };

  const handleCommentClick = (answerId) => {
    setCommentVisibility((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));
  };

  const handleCommentChange = (answerId, value) => {
    setCommentStates((prev) => ({
      ...prev,
      [answerId]: value,
    }));
  };

  const handleComment = async (answerId) => {
    if (!isAuthenticated || !user) {
      alert("Please login to post a comment");
      return;
    }

    const commentText = commentStates[answerId]?.trim();
    if (!commentText) {
      alert("Comment cannot be empty");
      return;
    }

    setCommentLoading((prev) => ({ ...prev, [answerId]: true }));

    try {
      const response = await axios.post(
        "/api/comment",
        {
          question_id: question_id,
          answer_id: answerId,
          comment: commentText,
          user: user._id,
          created_at: new Date(),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        setCommentStates((prev) => ({ ...prev, [answerId]: "" }));
        setCommentVisibility((prev) => ({ ...prev, [answerId]: false }));
        await updateAnswer();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert(error.response?.data?.message || "Failed to post comment");
    } finally {
      setCommentLoading((prev) => ({ ...prev, [answerId]: false }));
    }
  };

  const handleanswerLike = async (answerId) => {
    if (!isAuthenticated || !user) {
      alert("Please login to like answers");
      return;
    }

    try {
      const response = await axios.put(
        `/api/answer/like/${answerId}`,
        { userId: user._id },
        { withCredentials: true }
      );
      if (response.data.status) {
        updateAnswer();
      }
    } catch (error) {
      console.error("Error liking answer:", error);
      alert("Failed to like answer");
    }
  };

  const handlequestionLike = async () => {
    if (!isAuthenticated || !user) {
      alert("Please login to like questions");
      return;
    }

    try {
      const response = await axios.put(
        `/api/question/like/${question_id}`,
        { userId: user._id },
        { withCredentials: true }
      );
      if (response.data.status) {
        // Refresh question data
        const updatedQuestion = await axios.get(`/api/question/${question_id}`);
        setQuestiondata(updatedQuestion.data);
      }
    } catch (error) {
      console.error("Error liking question:", error);
      alert("Failed to like question");
    }
  };

  const handleanswerDislike = async (answerId) => {
    if (!isAuthenticated || !user) {
      alert("Please login to dislike answers");
      return;
    }

    try {
      const response = await axios.put(
        `/api/answer/dislike/${answerId}`,
        { userId: user._id },
        { withCredentials: true }
      );
      if (response.data.status) {
        updateAnswer();
      }
    } catch (error) {
      console.error("Error disliking answer:", error);
      alert("Failed to dislike answer");
    }
  };

  const handlequestionDislike = async () => {
    if (!isAuthenticated || !user) {
      alert("Please login to dislike questions");
      return;
    }

    try {
      const response = await axios.put(
        `/api/question/dislike/${question_id}`,
        { userId: user._id },
        { withCredentials: true }
      );
      if (response.data.status) {
        // Refresh question data
        const updatedQuestion = await axios.get(`/api/question/${question_id}`);
        setQuestiondata(updatedQuestion.data);
      }
    } catch (error) {
      console.error("Error disliking question:", error);
      alert("Failed to dislike question");
    }
  };

  if (loading) return <div className="main">Loading...</div>;
  if (error) return <div className="main">Error: {error}</div>;
  if (!questiondata) return <div className="main">Question not found</div>;

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
                <p className="stat">{questiondata?.likes?.length || 0}</p>
                <p
                  className={`like1 ${
                    questiondata?.likes?.includes(user?._id) ? "active" : ""
                  }`}
                  onClick={handlequestionLike}
                >
                  <ThumbUpOffAltIcon />
                </p>
                <p className="stat">{questiondata?.dislikes?.length || 0}</p>
                <p
                  className={`like2 ${
                    questiondata?.dislikes?.includes(user?._id) ? "active" : ""
                  }`}
                  onClick={handlequestionDislike}
                >
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

        <div className="all-answers">
          <p>Total answers = {questiondata?.answers?.length || 0}</p>
        </div>
        
        <div className="answers-container">
        {questiondata?.answers?.map((answer) => (
          <div key={answer._id} className="all-question-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="stat">{answer?.likes?.length || 0}</p>
                <p
                  className={`like1 ${
                    answer?.likes?.includes(user?._id) ? "active" : "null"
                  }`}
                  onClick={() => handleanswerLike(answer._id)}
                >
                  <ThumbUpOffAltIcon />
                </p>
                <p className="stat">{answer?.dislikes?.length || 0}</p>
                <p
                  className={`like2 ${
                    answer?.dislikes?.includes(user?._id) ? "active" : ""
                  }`}
                  onClick={() => handleanswerDislike(answer._id)}
                >
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
                {Array.isArray(answer?.comments) &&
                answer.comments.length > 0 ? (
                  answer.comments.map((comment) => {
                    console.log("Rendering comment:", answer.comments);
                    console.log("Comment user:", answer.comments.user);
                    console.log(
                      "Comment user username:",
                      answer.comments.user?.username
                    );
                    // Skip invalid comments
                    // if (!comment?._id || !comment?.comment) {
                    //   console.warn("Invalid comment data:", comment);
                    //   return null;
                    // }

                    return (
                      <div key={comment._id} className="comment">
                        <p className="comment-text">
                          {comment.comment}

                          <span className="comment-author">
                            {comment.user?.username
                              ? ` - @${comment.user.username}`
                              : " - Anonymous"}
                          </span>
                        </p>
                        {comment.createdAt && (
                          <small className="comment-date">
                            {new Date(comment.createdAt).toLocaleString()}
                          </small>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="no-comments">No comments yet</p>
                )}

</div>
                <div
                  className="comment-toggle"
                  onClick={() => handleCommentClick(answer._id)}
                >
                  {commentVisibility[answer._id] ? "Cancel" : "Add Comment"}
                  </div>

                {commentVisibility[answer._id] && (
                  <div className="add-comment">
                    <textarea
                      value={commentStates[answer._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(answer._id, e.target.value)
                      }
                      placeholder="Add your comment..."
                      rows={3}
                      disabled={commentLoading[answer._id]}
                    />
                    <button
                      onClick={() => handleComment(answer._id)}
                      disabled={commentLoading[answer._id]}
                    >
                      {commentLoading[answer._id]
                        ? "Posting..."
                        : "Post Comment"}
                    </button>
                  </div>
                )}
              </div>
            </div>
   
        ))}
         </div>

        <div className="main-answer">
          <h3>Your Answer</h3>
          <ReactQuill
            value={answer}
            onChange={handleAnswer}
            className="quill"
            theme="snow"
            placeholder="Write your answer here..."
          />
          <div className="button-container">
          <button type="submit" onClick={handleSubmit}>
            Post Answer
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MainQue;
