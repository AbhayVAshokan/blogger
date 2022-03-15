import React from "react";

import { useParams } from "react-router-dom";

const NavBar = ({ handleLogout }) => {
  const { userId, postId } = useParams();

  return (
    <nav>
      {<button>← Back</button>}
      {<button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default NavBar;
