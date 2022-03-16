import React from "react";

import { useParams } from "react-router-dom";
import useCommentsQuery from "../queries/comment";

const Post = () => {
  const { postId } = useParams();
  const {
    data: comments,
    isLoading,
    isError,
  } = useCommentsQuery().Fetch(postId);

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
    <section aria-busy={isLoading}>
      {comments.map(({ id, name, email, body }) => (
        <article key={id}>
          <h6>{name}</h6>
          <p>{body}</p>
          <a href={`mailto:${email}`}>{email}</a>
        </article>
      ))}
    </section>
  );
};

export default Post;
