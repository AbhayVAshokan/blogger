import { useQuery } from "react-query";

import commentsApi from "../apis/comment";

const useCommentsQuery = () => ({
  Fetch: (postId, options) =>
    useQuery(
      ["fetch-comments", postId],
      async () => {
        const { data } = await commentsApi.fetch(postId);
        return data;
      },
      {
        staleTime: 500000,
        refetchOnWindowFocus: false,
        ...options,
      }
    ),
});

export default useCommentsQuery;
