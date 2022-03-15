import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setPosts(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  if (isLoading) {
    return <progress indeterminate />;
  }

  return (
    <section>
      <h1>Posts</h1>
      {posts.map(({ id, title, body }) => (
        <Link to={`/${userId}/posts/${id}`}>
          <article key={id}>
            <h6>{title}</h6>
            <p>{body}</p>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default Dashboard;
