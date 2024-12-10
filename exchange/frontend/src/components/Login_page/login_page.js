import React, { useState } from "react";
import LoginForm from "./LoginFrom";
import RegisterForm from "./RegisterForm";
import "./CSS/login_page.css";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="auth">
      <div className="auth-container">
        <p>{isRegister ? "Register" : "Login"}</p>
        <div className="auth-login">
          {isRegister ? (
            <RegisterForm setMessage={setMessage} setIsRegister={setIsRegister} />
          ) : (
            <LoginForm setMessage={setMessage} />
          )}
          <button
            className="toggle-form"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage(""); // Clear any error messages
            }}
          >
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;