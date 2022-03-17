import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import usePostsQuery from "../queries/post";

const New = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { isLoading: isSubmitting, mutate: addPost } = usePostsQuery().Create({
    onSuccess: (post) => {
      post.userId = userId;
      queryClient.setQueryData(["list-posts", userId], (posts) => {
        posts.push(post);
        return posts;
      });
      navigate(-1);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    addPost(post);
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
