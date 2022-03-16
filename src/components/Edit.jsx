import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import usePostsQuery from "../queries/post";

const Edit = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data, isLoading, isError } = usePostsQuery().Show(postId, {
    onSuccess: (data) => setPost(data),
  });
  const [post, setPost] = useState(data);
  const { isLoading: isSubmitting, mutateAsync } = usePostsQuery().Update({
    postId,
    payload: post,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutateAsync({ postId, payload: post });
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((post) => ({ ...post, [name]: value }));
  };

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
