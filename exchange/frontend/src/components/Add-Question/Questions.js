import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // quill css
import {TagsInput} from "react-tag-input-component";
import "./CSS/Question.css";
function Questions() {
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
                <small>brief</small>
                <input type="text" placeholder="Add a title" />
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Question Title</h2>
                <small>include all the information</small>
                <ReactQuill className="react-quill" theme="snow" />
              </div>
            </div>
            <div className="options">
              <div className="title">
                <h2>Tags</h2>
                <small>Add necessary Tags</small>
                <TagsInput name="tags" placeHolder="Press Enter to add Tags"/>
              </div>
            </div>
          </div>
        </div>
        <button className="btn">Post Question</button>
      </div>
    </div>
  );
}

export default Questions;
