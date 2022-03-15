import React from "react";

import { Link } from "react-router-dom";

const NavBar = ({ handleLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/" className="contrast">
            <strong>Blogger</strong>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
