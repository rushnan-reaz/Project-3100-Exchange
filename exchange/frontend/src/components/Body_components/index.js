import React from "react";
import "./CSS/Index.css";
import SideBar from "./SideBar";
import Main from "./Main";
import axios from "axios";

function Index() {
  const [question, setQuestion] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get("/api/question")
        .then((res) => {
          console.log(res.data);
          setQuestion(res.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="index">
      <div className="index-content">
        <SideBar />
        <Main  question= {question}/>
      </div>
    </div>
  );
}

export default Index;
