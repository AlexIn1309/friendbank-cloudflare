import { Hono } from "hono";

import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const auth = new Hono();

auth.post("/login", AuthController.login);

auth.post("/refresh-token", AuthController.refreshToken);

auth.get("/me", authMiddleware, (c) => {
  const user = c.get("user");

  return c.json({
    authenticated: true,
    user,
  });
});

export default auth;
