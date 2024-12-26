import React from "react";
import "./CSS/Index.css";
import SideBar from "./SideBar";
import Main from "./Main";
// import axios from "axios";

function Index() {
  // const [question, setQuestion] = React.useState([]);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get("/api/question");
  //       console.log("Fetched questions:", res.data);
  //       // Check if questions array exists in response
  //       const questions = res.data.questions || [];
  //       setQuestion(questions);
  //     } catch (err) {
  //       console.error("Error fetching questions:", err);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="index">
      <div className="index-content">
        <SideBar />
        <Main/>
      </div>
    </div>
  );
}

export default Index;