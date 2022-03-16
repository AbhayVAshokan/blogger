import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        post
      );
      navigate(-1);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((post) => ({ ...post, [name]: value }));
  };

  if (isLoading) {
    return <progress indeterminate />;
  }

  return (
    <section>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          required
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <label htmlFor="body">Body</label>
        <textarea
          type="text"
          placeholder="Enter body"
          required
          rows={5}
          id="body"
          name="body"
          value={post.body}
          onChange={handleChange}
        />
        <button aria-busy={isSubmitting}>+ Submit</button>
      </form>
    </section>
  );
};

export default Edit;
