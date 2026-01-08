import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RegisForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", user);
      alert("Registrated Successfully.");
    } catch (error) {
      console.error("Registration Failed", error.message);
      alert("Registration failed. Please try again.");
    }
    setUser({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });
  };
  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "100%", maxWidth: "460px" }}
        >
          <h3 className="text-primary mb-4 fw-bold text-center">Sign Up</h3>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                required
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                required
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                required
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Role</label>
              <select
                className="form-select"
                name="role"
                value={user.role}
                onChange={onChangeHandler}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign up
            </button>
          </form>
          <p className="mt-3 text-center">
            If you already sign up then,
            <span
              onClick={() => navigate("/")}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisForm;
