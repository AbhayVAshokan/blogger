import React, { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Post from "./components/Post";

const App = () => {
  // Dummy state to simulate authentication.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main>
      <NavBar handleLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path=":userId/posts" element={<Dashboard />} />
            <Route path=":userId/posts/:postId" element={<Post />} />
            <Route path=":userId" element={<Navigate to=":userId/posts" />} />
            <Route path="" element={<Navigate to="login" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="login" />} />
        )}
      </Routes>
    </main>
  );
};

export default App;
