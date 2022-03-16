import React from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import usePostsQuery from "../queries/post";

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: posts, isLoading, isError } = usePostsQuery().Fetch(userId);

  if (isLoading) {
    return <progress indeterminate />;
  }

  if (isError) {
    return (
      <h3 className="secondary">
        Something went wrong! Please try again later.
      </h3>
    );
  }

  return (
    <section>
      <h1>Posts</h1>
      <button onClick={() => navigate(`/${userId}/posts/new`)}>
        + Add New Post
      </button>
      {posts.map(({ id, title, body }) => (
        <Link to={`/${userId}/posts/${id}`}>
          <article key={id}>
            <h6>{title}</h6>
            <p>{body}</p>
            <Link to={`/${userId}/posts/${id}/edit`} className="contrast">
              Edit ✍
            </Link>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default Dashboard;
