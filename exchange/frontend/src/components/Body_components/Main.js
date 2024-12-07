import { FilterList } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import Allquestions from "./Allquestions";
import "./CSS/Main.css";

function Main({ question }) {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-dec">
          <p>
            Top Questions
            <sub style={{ color: "gray", fontSize: "0.85em" }}>
              (out of {question.length})
            </sub>
          </p>

          {/* <p>Top Question</p> */}
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link>Newest</Link>
              </div>

              <div className="main-tab">
                <Link>Active</Link>
              </div>
              <div className="main-tab">
                <Link>More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterList />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {question.map((_q, index) => {
            console.log("Rendering question:", _q);
            return (
              <div key={_q._id} className="question">
                <Allquestions question={_q} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
