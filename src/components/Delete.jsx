import React from "react";

import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import usePostsQuery from "../queries/post";

const Delete = ({ isOpen, onClose, deletionId }) => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { isLoading: isDeleting, mutateAsync: deletePost } =
    usePostsQuery().Destroy(deletionId, {
      onSuccess: () => {
        queryClient.setQueryData(["list-posts", userId], (posts) =>
          posts.filter((post) => post.id !== parseInt(deletionId))
        );
      },
    });

  const handleSubmit = async () => {
    await deletePost(deletionId);
    onClose();
  };

  return (
    <dialog open={isOpen}>
      <article>
        <h3>Delete post</h3>
        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <footer>
          <a href="#cancel" role="button" class="secondary" onClick={onClose}>
            Cancel
          </a>
          <a
            href="#confirm"
            role="button"
            onClick={handleSubmit}
            aria-busy={isDeleting}
          >
            Confirm
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default Delete;
