import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import usePostsQuery from "../queries/post";

const Edit = () => {
  const navigate = useNavigate();
  const { postId, userId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = usePostsQuery().Show(
    { postId, userId },
    {
      onSuccess: (data) => setPost(data),
    }
  );
  const { isLoading: isSubmitting, mutate: updatePost } =
    usePostsQuery().Update(postId, {
      onSuccess: () => {
        queryClient.setQueryData(["list-posts", userId], (posts) => {
          const postIndex = posts.findIndex(
            (post) => post.id === parseInt(postId)
          );
          posts[postIndex] = post;
          return posts;
        });
        queryClient.setQueryData(["show-post", postId], () => post);
        navigate(-1);
      },
    });
  const [post, setPost] = useState(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updatePost(post);
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
