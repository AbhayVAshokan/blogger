import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
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
    return <p>Loading...</p>;
  }

  return (
    <section>
      {posts.map(({ id, title, body }) => (
        <div key={id} onClick={() => navigate(`/${userId}/posts/${id}`)}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}
    </section>
  );
};

export default Dashboard;
