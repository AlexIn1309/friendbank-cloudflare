import { Hono } from "hono";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const users = new Hono();

users.get("/accountant-only", authMiddleware, roleMiddleware([1]), (c) => {
  return c.json({ message: "Welcome, Accountant!" });
});

export default users;
