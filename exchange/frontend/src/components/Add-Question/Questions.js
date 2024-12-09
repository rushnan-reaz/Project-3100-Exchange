import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // quill css
import { TagsInput } from "react-tag-input-component";
import "./CSS/Question.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/counter/userSlice";

function Questions() {
  const user = useSelector(selectUser);
  const [loading, setLoading] = React.useState(false);

  const [Question_title, setQuestion_title] = React.useState("");
  const [Question_description, setQuestion_description] = React.useState("");
  const [Tags, setTags] = React.useState([]);

  const history = useHistory();

  const handleQuillchange = (value) => {
    setQuestion_description(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Question_title || !Question_description || !Tags) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    const questionJSON = {
      title: Question_title,
      description: Question_description,
      tag: Tags.length > 0 ? Tags : ["untagged"],
      user: user,
    };

    await axios
      .post("/api/question", questionJSON)
      .then((res) => {
        console.log("success_post_question");
        // console.log(questionJSON);
        alert("Question posted successfully");
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="add-questions">
      <div class="add-questions-container">
        <div class="header-title">
          <h1>Ask Question</h1>
        </div>
        <div class="questions-container">
          <div className="questions-options">
            <div className="options">
              <div className="title">
                <h2>Question Title</h2>
                <small>Brief</small>
                <input
                  value={Question_title}
                  onChange={(e) => setQuestion_title(e.target.value)}
                  type="text"
                  placeholder="Add a title"
                />
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Question Description</h2>
                <small>Include all the information</small>
                <ReactQuill
                  value={Question_description}
                  onChange={handleQuillchange}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Tags</h2>
                <small>
                  Add necessary Tags<sub>(Duplicate tags are not allowed.)</sub>
                </small>
                <TagsInput
                  value={Tags}
                  onChange={(tags) => {

                    // Convert all tags to lowercase for comparison
                    const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

                    // Check for duplicates using the lowercase tags
                    const hasDuplicates = lowerCaseTags.some(
                      (tag, index) =>
                        lowerCaseTags.slice(0, index).includes(tag) ||
                        lowerCaseTags.slice(index + 1).includes(tag)
                    );

                    if (hasDuplicates) {
                      alert("Duplicate tags are not allowed!");
                      return;
                    }

                    setTags(tags);
                  }}
                  name="tags"
                  placeHolder="Press Enter to add Tags"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
          className="btn"
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>
    </div>
  );
}

export default Questions;
