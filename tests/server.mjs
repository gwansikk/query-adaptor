import { ServerChain } from "../dist/cjs/index.js";

const server = new ServerChain({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
  interceptors: {
    request: (options) => {
      console.log("** request interceptor **");
      return options;
    },
    response: (response) => {
      console.log("** response interceptor **");
      return response;
    },
    error: (response) => {
      console.log("** error interceptor **");
      return response;
    },
  },
});

export default server;
