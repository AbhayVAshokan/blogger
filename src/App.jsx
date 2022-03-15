import React, { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components";
import Edit from "./components/Edit";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import New from "./components/New";
import Post from "./components/Post";

const App = () => {
  // Dummy state to simulate authentication.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="container">
      <NavBar handleLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path=":userId/posts" element={<Dashboard />} />
            <Route path=":userId/posts/new" element={<New />} />
            <Route path=":userId/posts/:postId/edit" element={<Edit />} />
            <Route path=":userId/posts/:postId" element={<Post />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="login" />} />
        )}
      </Routes>
    </main>
  );
};

export default App;
