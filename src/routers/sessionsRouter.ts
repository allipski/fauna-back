import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const sessionsRouter = Router();

sessionsRouter
    .all("/*", authenticateToken)
    .post('/', )

export { sessionsRouter };