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
    return <p>Loading...</p>;
  }

  return (
    <section>
      {comments.map(({ id, name, email, body }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{body}</p>
        </div>
      ))}
    </section>
  );
};

export default Post;
