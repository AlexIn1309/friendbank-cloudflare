import { Hono } from "hono";
import { Env } from "./src/types/env";
import authRoutes from "./src/routes/auth.routes";

const app = new Hono<Env>();

app.route("/auth", authRoutes);

export default app;
