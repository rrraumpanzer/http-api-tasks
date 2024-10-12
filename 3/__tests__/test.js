import fs from "fs";
import url from "url";
import path from "path";
import build from "../server/server.js";
import { execSync } from "child_process";
import { exec } from "child_process";
import util from "util";

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

test("get courses json", async () => {
  const command = fs.readFileSync("solution", "utf-8").toString().trim();
  const { stdout, stderr } = await execPromise(command);
  const actualCourses = stdout.trim();
  const expectedCourses = readFixture("courses.json").toString().trim();
  expect(actualCourses).toEqual(expectedCourses);
});
