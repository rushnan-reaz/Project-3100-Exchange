import React, { useContext, useState, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import "./CSS/Question.css";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";

function Questions() {
  const { user, isAuthenticated} = useContext(AuthContext);
  const history = useHistory();
  
  

  const [loading, setLoading] = useState(false);
  const [Question_title, setQuestion_title] = useState("");
  const [Question_description, setQuestion_description] = useState("");
  const [Tags, setTags] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('History object:', history);
    console.log('Auth state:', { user, isAuthenticated });

    if (!loading && !isAuthenticated) {
      console.log("User not authenticated, redirecting...");
      history.push('/login');
    }
  }, [user, isAuthenticated, loading, history]);

  const handleQuillchange = (value) => {
    setQuestion_description(value);
  };

  // Constants for validation
  const MAX_TITLE_LENGTH = 150;
  const MAX_TAGS = 5;
  const MIN_DESCRIPTION_LENGTH = 30;

  const resetForm = () => {
    setQuestion_title("");
    setQuestion_description("");
    setTags([]);
    setError("");
  };

  const validateForm = () => {
    if (!Question_title.trim()) {
      setError("Title is required");
      return false;
    }

    if (Question_title.length > MAX_TITLE_LENGTH) {
      setError(`Title cannot exceed ${MAX_TITLE_LENGTH} characters`);
      return false;
    }

    if (Question_description.length < MIN_DESCRIPTION_LENGTH) {
      setError(`Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`);
      return false;
    }

    if (Tags.length > MAX_TAGS) {
      setError(`Maximum ${MAX_TAGS} tags allowed`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   

    // if (!user) {
    //   setError("Please login to post a question");
    //   history.push("/login"); 
    //   return;
    // }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/question", {
        title: Question_title.trim(),
        description: Question_description,
        tag: Tags.length > 0 ? Tags.map(tag => tag.toLowerCase()) : ["untagged"],
      }, {
        withCredentials: true
      });

      console.log("Question posted:", response.data);
      console.log("Question posted:/question?q=", response.data.data._id);
      console.log("User:", response.data.user);

      if (response.data.status) {
        resetForm();
        if (window.confirm("Question posted successfully! View your question?")) {
          // history.push(`/question?q=${response.data.data._id}`);
          // history.push(`/`);
          window.location.href = `/question?q=${response.data.data._id}`;
        } else {
          window.alert(" Question not posted successfully");
          // history.push("/add-question");
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error("Error posting question:", error);
      setError(error.response?.data?.message || "Error posting question");
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (tags) => {
    const lowerCaseTags = tags.map(tag => tag.toLowerCase());
    const uniqueTags = [...new Set(lowerCaseTags)];
    
    if (uniqueTags.length !== tags.length) {
      setError("Duplicate tags are not allowed!");
      return;
    }

    if (tags.length > MAX_TAGS) {
      setError(`Maximum ${MAX_TAGS} tags allowed`);
      return;
    }

    setTags(uniqueTags);
    setError("");
  };

  return (
    <div className="add-questions">
      <div className="add-questions-container">
        <div className="header-title">
          <h1>Ask Question</h1>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="questions-container">
          <div className="questions-options">
            <div className="options">
              <div className="title">
                <h2>Question Title</h2>
                <small>Be specific and imagine you're asking a question to another person. Maximum {MAX_TITLE_LENGTH} characters.</small>
                <input
                  value={Question_title}
                  onChange={(e) => setQuestion_title(e.target.value)}
                  type="text"
                  placeholder="e.g. How to center a div using flexbox?"
                  maxLength={MAX_TITLE_LENGTH}
                  required
                />
                <small>{Question_title.length}/{MAX_TITLE_LENGTH}</small>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Question Description</h2>
                <small>Include all the information someone would need to answer your question. Minimum {MIN_DESCRIPTION_LENGTH} characters.</small>
                <ReactQuill
                  value={Question_description}
                  onChange={handleQuillchange}
                  className="react-quill"
                  theme="snow"
                />
                <small>{Question_description.length} characters</small>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Tags</h2>
                <small>Add up to {MAX_TAGS} tags to describe what your question is about</small>
                <TagsInput
                  value={Tags}
                  onChange={handleTagChange}
                  name="tags"
                  placeHolder="Press Enter to add Tags"
                  maxTags={MAX_TAGS}
                />
                <small>{Tags.length}/{MAX_TAGS} tags used</small>
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
          className="btn">
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>
    </div>
  );
}

export default Questions;