import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const usePostsQuery = () => {
  const queryClient = useQueryClient();

  return {
    Fetch: (userId, options) =>
      useQuery(
        ["list-posts", userId],
        async () => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          );
          return data;
        },
        {
          staleTime: 500000,
          ...options,
        }
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
        {
          ...options,
        }
      ),
    Create: (payload, options) =>
      useMutation(
        "create-post",
        async () => {
          const { data } = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            payload
          );

          return data;
        },
        options
      ),
    Update: ({ postId, payload }, options) =>
      useMutation(
        ["update-post", postId],
        async () => {
          const data = await axios.patch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            payload
          );
          return data;
        },
        options
      ),
    Destroy: (postId, options) =>
      useMutation(
        ["destroy-post", postId],
        async () => {
          const { data } = await axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          return data;
        },
        options
      ),
  };
};

export default usePostsQuery;
