import React from "react";

import usePostsQuery from "../queries/post";

const Delete = ({ isOpen, onClose, deletionId }) => {
  const { isLoading: isDeleting, mutateAsync } =
    usePostsQuery().Destroy(deletionId);

  const handleSubmit = async () => {
    await mutateAsync(deletionId);
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
