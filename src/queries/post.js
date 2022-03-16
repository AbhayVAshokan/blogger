import { useMutation, useQuery, useQueryClient } from "react-query";

import postsApi from "../apis/post";

const usePostsQuery = () => {
  const queryClient = useQueryClient();

  return {
    Fetch: (userId, options) =>
      useQuery(
        ["list-posts", userId],
        async () => {
          const { data } = await postsApi.fetch(userId);
          return data;
        },
        {
          staleTime: 500000,
          refetchInterval: 500000,
          ...options,
        }
      ),

    Show: (postId, options) =>
      useQuery(
        ["show-post", postId],
        async () => {
          const { data } = await postsApi.show(postId);
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
          const { data } = await postsApi.create(payload);
          return data;
        },
        options
      ),

    Update: ({ postId, payload }, options) =>
      useMutation(
        ["update-post", postId],
        async () => {
          const data = postsApi.update(postId, payload);
          return data;
        },
        options
      ),

    Destroy: (postId, options) =>
      useMutation(
        ["destroy-post", postId],
        async () => {
          const { data } = await postsApi.destroy(postId);
          return data;
        },
        options
      ),
  };
};

export default usePostsQuery;
