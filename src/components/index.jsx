import React, { useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import Delete from "./Delete";

import usePostsQuery from "../queries/post";

const Dashboard = () => {
  const [deletionId, setDeletionId] = useState();
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
        <article key={id}>
          <Link to={`/${userId}/posts/${id}`}>
            <h6>{title}</h6>
          </Link>
          <p>{body}</p>
          <Link to={`/${userId}/posts/${id}/edit`} className="contrast">
            Edit ✍
          </Link>{" "}
          <Link
            to="#delete"
            className="contrast"
            onClick={() => setDeletionId(id)}
          >
            Delete 🗑️
          </Link>
        </article>
      ))}
      <Delete
        isOpen={deletionId}
        onClose={() => setDeletionId()}
        deletionId={deletionId}
      />
    </section>
  );
};

export default Dashboard;
