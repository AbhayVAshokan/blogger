import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
          navigate("/");
        }}
      >
        <h2>Login</h2>
        <input type="text" placeholder="Email or Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
