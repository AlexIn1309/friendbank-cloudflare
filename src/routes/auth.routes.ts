import { Hono } from "hono";

import { AuthController } from "../controllers/auth.controller";

const auth = new Hono();

auth.post("/login", AuthController.login);

export default auth;
