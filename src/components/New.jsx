import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", post);
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

  return (
    <section>
      <h1>Create Post</h1>
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

export default New;
