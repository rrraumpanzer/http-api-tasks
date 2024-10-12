import fastify from "fastify";
import _ from "lodash";

const courses = [
  {
    id: 1,
    name: "HTTP API",
    description:
      "В этом курсе рассказывается о том, что такое HTTP API, зачем оно нужно и где применяется",
  },
  {
    id: 2,
    name: "Протокол HTTP",
    description:
      "Этот курс посвящен интернет-протоколу HTTP, благодаря которому работают веб-сайты и браузеры",
  },
  {
    id: 3,
    name: "Продакшен и деплой",
    description:
      "В этом курсе мы пройдем весь путь от разработки до масштабирования приложения",
  },
];

export default async () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.get("/courses", (req, res) => {
    const { headers } = req;

    if (
      !_.has(headers, "accept") ||
      _.get(headers, "accept") !== "application/json"
    ) {
      res.send("Wrong content type\n");
    }

    const data = JSON.stringify(courses);
    res
      .header("Content-Type", "application/json; charset=utf-8")
      .send(`${data}\n`);
  });

  return app;
};
