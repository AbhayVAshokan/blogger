import axios from "axios";

const fetch = (postId) =>
  axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

const commentsApi = { fetch };

export default commentsApi;
