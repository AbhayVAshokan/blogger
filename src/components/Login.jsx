import React from "react";

import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const userId = Math.floor(Math.random() * 10 + 1);
    setIsLoggedIn(true);
    navigate(`/${userId}/posts`);
  };

  return (
    <section className="container-fluid">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label htmlFor="username">Username</label>
        <input
          id="email"
          type="email"
          placeholder="Email or Username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
