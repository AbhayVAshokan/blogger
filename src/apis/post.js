import axios from "axios";

const fetch = (userId) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

const show = (postId) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

const create = (payload) =>
  axios.post("https://jsonplaceholder.typicode.com/posts", payload);

const update = (postId, payload) =>
  axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, payload);

const destroy = (postId) =>
  axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);

const postsApi = { fetch, show, create, update, destroy };

export default postsApi;
