import fs from "fs";
import url from "url";
import path from "path";
import { execSync } from "child_process";
import { exec } from "child_process";
import util from "util";
import build from "../server/server.js";
import users from "../__fixtures__/users.json";

const execPromise = util.promisify(exec);

let app;
let server;

const getFixturePath = (filename) => path.join("__fixtures__", filename);
const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").trim();

beforeAll(async () => {
  app = await build();
  server = await app.listen(8080);
});

afterAll(async () => {
  await app.close();
});

test("greet", async () => {
  const command = fs.readFileSync("greet", "utf-8").toString().trim();

  const { stdout, stderr } = await execPromise(command);
  const { result } = JSON.parse(stdout);

  expect(result).toEqual("Hello, Tota!");
});

test("users", async () => {
  const command = fs.readFileSync("get_users", "utf-8").toString().trim();

  const { stdout, stderr } = await execPromise(command);
  const response = stdout.trim();

  expect(JSON.parse(response)).toMatchObject(users);
});
