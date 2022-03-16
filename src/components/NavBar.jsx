import React from "react";

import { Link, Outlet, useParams } from "react-router-dom";
import usePostsQuery from "../queries/post";
import useUsersQuery from "../queries/user";

const NavBar = ({ handleLogout }) => {
  const { userId, postId } = useParams();
  const post = usePostsQuery().Show(postId, { enabled: !!postId });
  const user = useUsersQuery().Show(userId, { enabled: !!userId });

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={userId ? `/${userId}/posts` : "/"} className="contrast">
              <strong>Blogger</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {userId && (
              <a href="#user" className="secondary" aria-busy={user.isLoading}>
                {user.data?.name}
              </a>
            )}
          </li>
          <li>
            <Link to="login" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {postId && <h2 aria-busy={post.isLoading}>{post.data?.title}</h2>}
      <Outlet />
    </>
  );
};

export default NavBar;
