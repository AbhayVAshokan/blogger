import React, { useEffect, useState } from "react";

import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const userId = Math.floor(Math.random() * 10 + 1);
      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      setUser(user);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    loadUser();
    return () => setIsLoggedIn(false);
  }, [isLoggedIn]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="login"
        element={<Login handleSubmit={() => setIsLoggedIn(true)} />}
      />
      {isLoggedIn ? (
        <Route path="" element={<Dashboard user={user} />} />
      ) : (
        <Route path="*" element={<Navigate to="login" />} />
      )}
    </Routes>
  );
};

export default App;
