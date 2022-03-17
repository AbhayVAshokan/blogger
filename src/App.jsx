import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Dashboard from "./components";
import Edit from "./components/Edit";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import New from "./components/New";
import Post from "./components/Post";

const App = () => {
  // Dummy state to simulate authentication.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<NavBar handleLogout={() => setIsLoggedIn(false)} />}
          >
            <Route
              path="login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            {isLoggedIn ? (
              <>
                <Route path=":userId/posts" element={<Dashboard />} />
                <Route path=":userId/posts/new" element={<New />} />
                <Route path=":userId/posts/:postId/edit" element={<Edit />} />
                <Route path=":userId/posts/:postId" element={<Post />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="login" />} />
            )}
          </Route>
        </Routes>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
