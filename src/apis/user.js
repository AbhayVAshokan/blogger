import axios from "axios";

const show = (userId) =>
  axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

const usersApi = { show };

export default usersApi;
