import React, { useState } from "react";

const RegisterForm = ({ setMessage, setIsRegister }) => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    studentId: "",
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(
          "Registration successful! Please check your email for verification."
        );
        setIsRegister(false); // Switch to login form
        setRegisterData({
          firstName: "",
          lastName: "",
          department: "",
          studentId: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Error during registration, please try again later.");
    }
  };

  return (
    <form className="auth-login-container" onSubmit={handleRegisterSubmit}>
      <div className="input-field">
        <p>First Name</p>
        <input
          type="text"
          name="firstName"
          value={registerData.firstName}
          onChange={handleRegisterChange}
          required
        />
        <small className="helper-text">
          This will be added to your username
        </small>
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
        <p>Email</p>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
