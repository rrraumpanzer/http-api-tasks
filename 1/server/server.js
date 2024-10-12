import fastify from "fastify";

const users = [
  {
    name: "Tota",
    email: "tota@gmail.com",
  },
  {
    name: "John",
    email: "john@smith.us",
  },
  {
    name: "Jim",
    email: "morrison@thedoors.com",
  },
];

export default () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.get("/users", (req, res) => {
    res.header("Content-Type", "application/json");
    const data = JSON.stringify(users);
    res.send(`${data}\n`);
  });

  return app;
};
