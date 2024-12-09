import { useState } from "react";
import "./CSS/login_page.css";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    studentId: "",
    email: "", // Added email field here
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Login successful");
      } else {
        setMessage(result.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error during login");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Data:", registerData);
  
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
  
      const result = await response.json();
  
      // Check if registration was successful
      if (response.ok) {
        setMessage(
          "Registration successful! Please check your email for verification."
        );
        setIsRegister(false); // Automatically switch to the login form
      } else {
        // Log the response status and message for better error handling
        console.error("Registration failed with status:", response.status);
        console.error("Error message from server:", result.message);
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      // Log the error in case of failure
      console.error("Error during registration:", error);
      setMessage("Error during registration, please try again later.");
    }
  };
  

  return (
    <div className="auth">
      <div className="auth-container">
        <p>{isRegister ? "Register" : "Login"}</p>
        <div className="auth-login">
          {isRegister ? (
            <form
              className="auth-login-container"
              onSubmit={handleRegisterSubmit}
            >
              <div className="input-field">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-field">
                <p>Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-field">
                <p>Department</p>
                <input
                  type="text"
                  name="department"
                  value={registerData.department}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-field">
                <p>Student ID</p>
                <input
                  type="text"
                  name="studentId"
                  value={registerData.studentId}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-field">
                <p>Email</p> {/* Added email input field */}
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-field">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <p className="username-notice">
                Username will be generated automatically.
              </p>

              <button type="submit">Register</button>
            </form>
          ) : (
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
          )}
          <button
            className="toggle-form"
            onClick={() => {
              setIsRegister(!isRegister); // Toggle the form
              setMessage(""); // Clear any existing message
            }}
          >
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
        {message && <p className="message">{message}</p>}{" "}
        {/* Display any message */}
      </div>
    </div>
  );
};

export default LoginPage;
