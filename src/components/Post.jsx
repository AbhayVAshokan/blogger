import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { userId, postId } = useParams();

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}&userId=${userId}`
        );
        setComments(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [userId, postId]);

  if (isLoading) {
    return <progress indeterminate />;
  }

  return (
    <section aria-busy={isLoading}>
      <h1>Comments</h1>
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
