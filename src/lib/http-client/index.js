import axios from "axios";

// TODO: add intecreptors
export const httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
