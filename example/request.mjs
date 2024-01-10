import server from "./server.mjs";

const data = await server.get({ url: "awards?page=0&size=20" });

console.log(data);
