import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Body_components from "./components/Body_components/index.js";
import Question from "./components/Add-Question/Questions.js";
import ViewQuestion from "./components/ViewQuestion/Index.js";
import Login from "./components/Login_page/login_page.js"; // Fix naming convention
import VerifiedPage from "./components/Verified/Verified.js";
import VerificationFailedPage from "./components/Verified/VerErr.js";
import VerifyEmail from "./components/Verified/verification.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext.js";
import { SearchProvider } from "./context/searchcontext.js";
import ProtectedRoute from "./components/Protected/Protected.js";

function App() {
  return (
    <Router>
      <SearchProvider>
      <AuthProvider>
        <div className="App">
          <Header />
          <Switch>
            {/* Public Routes */}
            <Route path="/verify-email" component={VerifyEmail} />
            <Route path="/verification-failed" component={VerificationFailedPage} />
            <Route path="/verified" component={VerifiedPage} />
            <Route exact path="/login" component={Login} />

            {/* Protected Routes */}
            <ProtectedRoute exact path="/" component={Body_components} />
            <ProtectedRoute exact path="/add-question" component={Question} />
            <ProtectedRoute exact path="/question" component={ViewQuestion} />
            
            {/* 404 Route */}
            <Route path="*" render={() => <div>Page not found</div>} />
          </Switch>
        </div>
      </AuthProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;