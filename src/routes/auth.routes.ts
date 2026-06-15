import { Hono } from "hono";

import { authController } from "../controllers/auth.controller";

const auth = new Hono();

auth.post("/login", authController.login);

export default auth;
