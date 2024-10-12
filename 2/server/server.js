import fastify from "fastify";
import _ from "lodash";

let comments = [
  {
    id: 1,
    user_id: 7,
    text: "Bla-bla, butum.",
  },
  {
    id: 2,
    user_id: 1,
    text: "I see a lot of potential in Tota as a student.",
  },
  {
    id: 3,
    user_id: 12,
    text: "Edit me!",
  },
];

export default () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.get("/comments", (req, res) => {
    res.header("Content-Type", "application/json");
    const data = JSON.stringify(comments);
    res.send(`${data}\n`);
  });

  app.get("/comments/:id", (req, res) => {
    const commentId = Number(req.params.id);
    const comment = comments.find(({ id }) => id === commentId);

    if (comment === undefined) {
      res.status(404).send(`Comment with id = ${commentId} does not exist\n`);
    }

    const result = JSON.stringify(comment);
    res.header("Content-Type", "application/json");
    res.send(`${result}`);
  });

  app.patch("/comments/:id", (req, res) => {
    const id = Number(req.params.id);
    const [comment] = comments.filter((item) => item.id === id);

    if (_.isUndefined(comment)) {
      res.status(404).send(`Comment with id = ${id} does not exist\n`);
    }

    if (!_.has(comment, "text") || _.keys(comment) > 1) {
      res.status(400);
    }

    const updatedComment = { ...comment, ...req.body };
    const data = JSON.stringify(updatedComment);

    comments = comments.map((item) => (item.id === id ? updatedComment : item));

    res
      .header("Content-Type", "application/json; charset=utf-8")
      .send(`${data}\n`);
  });

  return app;
};
