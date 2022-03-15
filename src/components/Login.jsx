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
        <input type="text" placeholder="Email or Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
