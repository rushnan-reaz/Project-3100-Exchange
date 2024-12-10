import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";

const LoginForm = ({ setMessage }) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // Ensure cookies are included
      });
      const result = await response.json();

      console.log('Login response:', result); // Log the response

      if (response.ok) {
        localStorage.setItem("accessToken", result.accessToken);
        login(result.user, result.accessToken);
        history.push("/");
      } else {
        setMessage(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Error during login, please try again later.");
    }
  };

  return (
    <form className="auth-login-container" onSubmit={handleLoginSubmit}>
      <div className="input-field">
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />
      </div>
      <div className="input-field">
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;