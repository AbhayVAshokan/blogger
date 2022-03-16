import axios from "axios";
import { useQuery } from "react-query";

const usePostsQuery = () => ({
  Fetch: (userId, options) =>
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
  Show: (postId, options) =>
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
