import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", user);
      const token = res.data.token;
      const role = res.data.user.role;
      const userId =res.data.user.id;
      const name = res.data.user.name;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      alert("Login Successfully.");
      // console.log("User role:", role);
      // console.log(name);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/all-blogs");
      }
    } catch (error) {
      console.error("Login failed.", error);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "100% ", maxWidth: "400px" }}
        >
          <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
                required
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
