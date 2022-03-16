import axios from "axios";
import { useQuery } from "react-query";

const useCommentsQuery = () => ({
  Fetch: (postId, options) =>
    useQuery(
      ["fetch-comments", postId],
      async () => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        return data;
      },
      options
    ),
});

export default useCommentsQuery;
