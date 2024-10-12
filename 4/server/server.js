import fastify from "fastify";
import { JSONRPCServer } from "json-rpc-2.0";

const server = new JSONRPCServer();

const users = [
  {
    id: 1,
    name: "Tota",
  },
  {
    id: 2,
    name: "Antony",
  },
  {
    id: 3,
    name: "John",
  },
  {
    id: 4,
    name: "Mia",
  },
];

server.addMethod("greet", ({ name }) => `Hello, ${name}!`);
server.addMethod("get_users", () => users);

export default async () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.post("/json-rpc", (req, res) => {
    const jsonRPCRequest = req.body;

    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
      if (jsonRPCResponse) {
        res.send(jsonRPCResponse);
      } else {
        res.code(204);
      }
    });
  });

  return app;
};
