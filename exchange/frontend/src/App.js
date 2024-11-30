import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Body_components from "./components/Body_components/index.js";
import Question from "./components/Add-Question/Questions.js";
import ViewQuestion from "./components/ViewQuestion/Index.js";
import login from "./components/Login_page/login_page.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>

        
          <Route exact path="/add-question" component={Question} />
          <Route exact path="/" component={Body_components} />
          <Route exact path="/question" component={ViewQuestion} />
          {/* <Route exact path="/login" component={login} /> */}
          <Route exact path="/login" component={login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
