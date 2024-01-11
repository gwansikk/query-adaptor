import server from "./server.mjs";

server.get({ url: "posts/1" }).then((data) => console.log(data));
