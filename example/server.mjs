import ServerChain from "../dist/cjs/index.js";

const server = new ServerChain("https://api.clab.page");

server.setHeaders({
  "Content-Type": "application/json",
  authorization: "Bearer user-token",
});

server.setRequestInterceptor((config) => {
  console.log(config);
});

server.setResponseInterceptor((response) => {
  if (response.status === 200) {
    console.log(200);
  }

  return response;
});

server.setErrorInterceptor((error) => {
  if (error.status === 401) {
    console.log("토큰 재발급 필요");
  }

  return error;
});

export default server;
