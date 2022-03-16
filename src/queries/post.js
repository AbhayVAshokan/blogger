import axios from "axios";
import { useMutation, useQuery } from "react-query";

const usePostsQuery = () => ({
  fetch: (userId, options) =>
    useQuery(
      ["list-posts", userId],
      async () => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        return data;
      },
      options
    ),
  show: (postId, options) =>
    useQuery(
      ["show-post", postId],
      async () => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        return data;
      },
      options
    ),
});

export default usePostsQuery;
